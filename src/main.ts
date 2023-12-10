import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const PORT = process.env.PORT

	const app = await NestFactory.create(AppModule)
	app.useGlobalPipes(new ValidationPipe())

	app.setGlobalPrefix('api')

	await app.listen(PORT)

	console.log(`The server is listening on port ${PORT}`)
}
bootstrap()
