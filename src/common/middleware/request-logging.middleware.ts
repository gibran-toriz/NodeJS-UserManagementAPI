import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../../config/logger';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  
/**
 * Middleware function to log incoming requests.
 * @param req - The Request object.
 * @param res - The Response object.
 * @param next - The next middleware function.
 */
use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, hostname} = req; 
    const startAt = new Date().toISOString();

    // Paths to exclude from logging
    const excludePaths = [ '/api' ];
    const url = originalUrl;    
    
    // Only log if the path is not in the exclude list
    if (!excludePaths.some(path => url.startsWith(path))) {
        try {
            logger.info({ method, url, startAt, hostname }, 'Incoming request');    
        } catch (error) {         
            console.error('Logging error:', error);            
        }        
    }
    
    next();
}

}
