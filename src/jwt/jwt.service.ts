import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JWTDecodeDto } from './dto/jwt-decode.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class CustomJwtService {
	constructor(private jwtService: JwtService) {}

	async decodeToken(token: JWTDecodeDto) {
		try {
			const decodedToken = await this.jwtService.verifyAsync(token.token, {
				secret: process.env.JWT_SECRET_KEY
			})
			return {
				accessToken: token.token,
				...decodedToken
			}
		} catch (error) {
			throw new UnauthorizedException('Token has expired')
		}
	}
}
