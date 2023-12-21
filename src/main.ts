import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
	const PORT = process.env.PORT

	const app = await NestFactory.create(AppModule)
	app.useGlobalPipes(new ValidationPipe())

	app.setGlobalPrefix('api')
	app.enableCors({
		origin: 'http://localhost:3000', // Укажите точный URL вашего фронтенда
		credentials: true
	})
	app.use(cookieParser())

	await app.listen(PORT)

	console.log(`The server is listening on port ${PORT}`)
}
bootstrap()
