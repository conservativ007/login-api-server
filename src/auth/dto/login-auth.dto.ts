import { IsString, MinLength } from 'class-validator'

export class LoginAuthDto {
	@IsString()
	@MinLength(2)
	username: string

	@IsString()
	@MinLength(3)
	password: string
}
