import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './modules/app.module';
import { logger } from './config/logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Load environment variables 
require('dotenv').config();

/**
 * Initializes and starts the NestJS application.
 * 
 * @returns {Promise<void>} A promise that resolves when the application is successfully started.
 */
async function bootstrap(): Promise<void> {
  try {
    // Create a NestJS application instance using Fastify as the HTTP adapter
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
      { logger: false },
    );

    // Set up Swagger for the application
    const config = new DocumentBuilder()
      .setTitle('User Management API')
      .setDescription('API for managing user data')
      .setVersion('1.0')
      .build();    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api', app, document);
    
    // Starting the application
    const port = process.env.PORT || 3000;    
    await app.listen(port, '0.0.0.0');

    // Log the application URL
    logger.info(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    // Log the error and exit the process
    logger.error(`Failed to bootstrap the application: ${error.message}`, error);
    process.exit(1);
  }
}

// Invoke the bootstrap function to start the application
bootstrap();
