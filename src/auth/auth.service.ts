import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { SignUpAuthDto } from './dto/signup-auth.dto'
import { LoginAuthDto } from './dto/login-auth.dto'
import { PrismaService } from 'src/prisma.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwtService: JwtService) {}

	async getTokens(userId: number, name: string) {
		const at = await this.jwtService.signAsync(
			{ userId, name },
			{
				secret: process.env.JWT_SECRET_KEY,
				expiresIn: '6h'
			}
		)
		return at
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

		return await this.prisma.user.create({ data: createAuthDto })
	}

	async login(loginAuthDto: LoginAuthDto) {
		const isUserExist = await this.prisma.user.findFirst({
			where: {
				username: loginAuthDto.username,
				password: loginAuthDto.password
			}
		})

		if (isUserExist === null) {
			throw new NotFoundException(['User not found'])
		}

		const token = await this.getTokens(isUserExist.id, isUserExist.name)

		return {
			name: isUserExist.name,
			accessToken: token
		}
	}

	async findAll() {
		return await this.prisma.user.findMany()
	}
}
