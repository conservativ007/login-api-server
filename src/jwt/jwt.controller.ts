import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { CustomJwtService } from './jwt.service'
import { JWTDecodeDto } from './dto/jwt-decode.dto'

@Controller('jwt')
export class JwtController {
	constructor(private readonly jwtService: CustomJwtService) {}

	@HttpCode(200)
	@Post('decode')
	async login(@Body() token: JWTDecodeDto) {
		return await this.jwtService.decodeToken(token)
	}
}
