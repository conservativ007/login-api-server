import { Injectable } from '@nestjs/common'
import { SignUpAuthDto } from './dto/signup-auth.dto'
import { LoginAuthDto } from './dto/login-auth.dto'

@Injectable()
export class AuthService {
	signup(createAuthDto: SignUpAuthDto) {
		return 'This action adds a new auth'
	}

	login(loginAuthDto: LoginAuthDto) {
		return `This action returns all auth`
	}

	findAll() {
		return `This action returns all auth`
	}
}
