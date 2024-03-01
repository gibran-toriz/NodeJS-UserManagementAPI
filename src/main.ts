import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './modules/app.module';
import { logger } from './config/logger'; 

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

    // Define the application's port
    const port = process.env.PORT || 3000;

    // Start the application
    await app.listen(port, '0.0.0.0');
    
    // URL where the application is running
    logger.info(`Application is running on: ${await app.getUrl()}`);

  } catch (error) {    
    logger.error(`Failed to bootstrap the application: ${error.message}`, error);    
    process.exit(1);
  }
  }
  

// Invoke the bootstrap function to start the application
bootstrap();
