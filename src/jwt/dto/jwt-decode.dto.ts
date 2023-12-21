import { IsNotEmpty, IsString } from 'class-validator'

export class JWTDecodeDto {
	@IsString()
	@IsNotEmpty()
	token: string
}
