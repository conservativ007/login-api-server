import { IsString, MinLength } from 'class-validator'

export class SignUpAuthDto {
	@IsString()
	@MinLength(2)
	username: string

	@MinLength(2)
	@IsString()
	name: string

	@MinLength(3)
	@IsString()
	password: string
}
