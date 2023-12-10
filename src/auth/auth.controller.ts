import { Controller, Get, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpAuthDto } from './dto/signup-auth.dto'
import { LoginAuthDto } from './dto/login-auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	signup(@Body() createAuthDto: SignUpAuthDto) {
		return this.authService.signup(createAuthDto)
	}

	@Post('login')
	login(@Body() loginAuthDto: LoginAuthDto) {
		return this.authService.login(loginAuthDto)
	}

	@Get()
	findAll() {
		return this.authService.findAll()
	}
}
