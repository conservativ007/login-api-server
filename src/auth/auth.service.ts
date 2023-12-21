import {
	ConflictException,
	ForbiddenException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { SignUpAuthDto } from './dto/signup-auth.dto'
import { LoginAuthDto } from './dto/login-auth.dto'
import { PrismaService } from 'src/prisma.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { Request } from 'express'

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwtService: JwtService) {}

	async hashData(data: string) {
		return bcrypt.hash(data, 10)
	}

	async getTokens(userId: number, name: string) {
		const accessTokenAge = '1m'
		const refreshTokenAge = 60 * 60 * 24 * 7

		const [at, rt] = await Promise.all([
			this.jwtService.signAsync(
				{ userId, name },
				{
					secret: process.env.JWT_SECRET_KEY,
					expiresIn: accessTokenAge
				}
			),
			this.jwtService.signAsync(
				{ userId, name },
				{
					secret: process.env.JWT_SECRET_REFRESH_KEY,
					expiresIn: refreshTokenAge
				}
			)
		])
		return {
			accessToken: at,
			refreshToken: rt
		}
	}

	async signup(createAuthDto: SignUpAuthDto) {
		const isUserExist = await this.prisma.user.findFirst({
			where: {
				username: createAuthDto.username
			}
		})

		if (isUserExist !== null) {
			throw new ConflictException(['User already exists'])
		}

		const hashedPassword = await this.hashData(createAuthDto.password)
		createAuthDto.password = hashedPassword

		return await this.prisma.user.create({ data: createAuthDto })
	}

	async login(loginAuthDto: LoginAuthDto) {
		const isUserExist = await this.prisma.user.findFirst({
			where: {
				username: loginAuthDto.username
			}
		})

		if (isUserExist === null) {
			throw new NotFoundException(['User not found'])
		}

		// compare passwords
		const passwordMatches = await bcrypt.compare(
			loginAuthDto.password,
			isUserExist.password
		)
		if (!passwordMatches) throw new ForbiddenException(['Access Denied'])

		const tokens = await this.getTokens(isUserExist.id, isUserExist.name)

		const user = {
			userId: isUserExist.id,
			name: isUserExist.name,
			...tokens
		}

		return user
	}

	async verifyAccessToken(token: string) {
		try {
			return await this.jwtService.verify(token, {
				secret: process.env.JWT_SECRET_KEY
			})
		} catch (error) {
			// throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
			throw new UnauthorizedException(['UNAUTHORIZED'])
		}
	}

	async getProfile(id: string) {
		const isUserExist = await this.prisma.user.findFirst({
			where: {
				id: Number(id)
			}
		})

		if (isUserExist === null) {
			throw new NotFoundException(['User not found'])
		}

		isUserExist.password = ''

		return isUserExist
	}

	async refresh(req: Request) {
		const rt = req.cookies.refreshToken
		// console.log(req)
		if (!rt) {
			throw new UnauthorizedException()
		}

		try {
			const payload = await this.jwtService.verifyAsync(rt, {
				secret: process.env.JWT_SECRET_REFRESH_KEY
			})

			return payload
		} catch {
			throw new UnauthorizedException()
		}
	}

	async findAll() {
		return await this.prisma.user.findMany()
	}
}
