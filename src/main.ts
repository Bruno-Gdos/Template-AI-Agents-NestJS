import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/modules/app.module';
import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function createSwaggerDocument(app: INestApplication<any>) {
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('ASK AGENT Service API')
    .setDescription(
      'Here you can find all the endpoints of the ask agent Service API',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/reference',
    apiReference({
      spec: {
        content: document,
      },
      hideDownloadButton: true,
    }),
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes();
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await createSwaggerDocument(app);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
