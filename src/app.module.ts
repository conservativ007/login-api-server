import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { JwtModule } from './jwt/jwt.module'

@Module({
	imports: [AuthModule, JwtModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
