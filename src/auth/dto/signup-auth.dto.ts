import { IsString } from 'class-validator'

export class SignUpAuthDto {
	@IsString()
	username: string

	@IsString()
	name: string

	@IsString()
	password: string
}
