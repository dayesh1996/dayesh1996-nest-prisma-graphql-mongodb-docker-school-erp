import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Load environment variables from .env file
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Swagger configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('School ERP API')
    .setDescription('School ERP System API Documentation')
    .setVersion('1.0')
    .addTag('School ERP')
    .build();
  
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`GraphQL Playground: http://localhost:${port}/graphql`);
  console.log(`Swagger Documentation: http://localhost:${port}/api`);
}
bootstrap();
