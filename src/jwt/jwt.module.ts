import { Module } from '@nestjs/common'
import { CustomJwtService } from './jwt.service'
import { JwtController } from './jwt.controller'
import { JwtService } from '@nestjs/jwt'

@Module({
	controllers: [JwtController],
	providers: [CustomJwtService, JwtService]
})
export class JwtModule {}
