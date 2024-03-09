import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { logger } from './config/logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RequestLoggingMiddleware } from './common/middleware/request-logging.middleware';
import { LoggingInterceptor } from './common/interceptors/response-logging.interceptor';
import { ValidationPipe } from '@nestjs/common';

// Load environment variables 
require('dotenv').config();

/**
 * Initializes and starts the NestJS application.
 * 
 * @returns {Promise<void>} A promise that resolves when the application is successfully started.
 */
async function bootstrap(): Promise<void> {
  // Action to log
  const action = 'starting-application';
  try {    
    // Create a NestJS application instance using Fastify as the HTTP adapter
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
      { logger: false },
    );

    // Apply validations globally
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,      
      disableErrorMessages: false,
    }));

    // Apply middleware globally
    app.use(new RequestLoggingMiddleware().use);

    // Apply interceptor globally
    app.useGlobalInterceptors(new LoggingInterceptor());

    // Set up Swagger for the application
    const config = new DocumentBuilder()
      .setTitle('User Management API')
      .setDescription('API for managing user data')
      .setVersion('0.1.0')
      .addBearerAuth( 
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'access-token', 
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api', app, document);
    
    // Starting the application
    const port = process.env.PORT || 3000;    
    await app.listen(port, '0.0.0.0');

    // Log the application URL    
    logger.info({action}, `Application v0.1.1 is running on: ${await app.getUrl()}`);
  } catch (error) {
    // Log the error and exit the process
    logger.error({action}, `Failed to bootstrap the application: ${error.message}`, error);
    process.exit(1);
  }
}

// Invoke the bootstrap function to start the application
bootstrap();
