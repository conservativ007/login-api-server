import { Controller, Get, Post, Body, Res, HttpCode } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpAuthDto } from './dto/signup-auth.dto'
import { LoginAuthDto } from './dto/login-auth.dto'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(201)
	@Post('signup')
	async signup(@Body() createAuthDto: SignUpAuthDto) {
		return this.authService.signup(createAuthDto)
	}

	@HttpCode(200)
	@Post('login')
	async login(@Body() loginAuthDto: LoginAuthDto, @Res() res: Response) {
		const user = await this.authService.login(loginAuthDto)
		res.setHeader('Authorization', `Bearer ${user.accessToken}`)
		res.json(user)
	}

	@Get()
	findAll() {
		return this.authService.findAll()
	}
}
