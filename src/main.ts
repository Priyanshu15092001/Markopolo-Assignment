// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use validation pipe globally for DTOs
  app.useGlobalPipes(new ValidationPipe());

  // Load config service to read .env values
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  

  // Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('URL Shortener API')
    .setDescription('API to shorten URLs and track analytics')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document); // available at /docs

  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📘 Swagger Docs available at http://localhost:${port}/docs`);
}
bootstrap();
