import {
	Controller,
	Get,
	Post,
	Body,
	Res,
	HttpCode,
	UseGuards,
	Param,
	Req
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpAuthDto } from './dto/signup-auth.dto'
import { LoginAuthDto } from './dto/login-auth.dto'
import { Response, Request } from 'express'
import { AtGuard } from './common/guards/at.guard'

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
	async login(
		@Body() loginAuthDto: LoginAuthDto,
		@Res({ passthrough: true }) res: Response
	) {
		const user = await this.authService.login(loginAuthDto)
		res.cookie('refreshToken', user.refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000
		})
		// res.cookie('refreshToken', user.refreshToken)

		res.json({
			userId: user.userId,
			name: user.name,
			accessToken: user.accessToken
		})
	}

	@HttpCode(200)
	@Get('logout')
	loguot(@Res() res: Response) {
		res.cookie('refreshToken', '', {
			httpOnly: true,
			maxAge: 0
		})
	}

	@Get('profile/:username')
	@UseGuards(AtGuard)
	getProfile(@Param('username') id: string) {
		console.log('profile/:username')
		console.log(id)
		return this.authService.getProfile(id)
	}

	@Get()
	@UseGuards(AtGuard)
	findAll() {
		return this.authService.findAll()
	}

	@Get('refresh')
	async refresh(@Req() req: Request, @Res() res: Response) {
		const payload = await this.authService.refresh(req)
		const tokens = await this.authService.getTokens(
			payload.userId,
			payload.name
		)

		res.cookie('refreshToken', tokens.refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000
		})

		res.json({ accessToken: tokens.accessToken })
	}
}
