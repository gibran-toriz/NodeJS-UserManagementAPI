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
    const { method, originalUrl } = req; 
    const startAt = new Date().toISOString();
    const ip = req.socket.remoteAddress;

    // Paths to exclude from logging
    const excludePaths = [ '/api' ];
    
    // Only log if the path is not in the exclude list
    if (!excludePaths.some(path => originalUrl.startsWith(path))) {
        try {
            logger.info({ method, originalUrl, startAt, ip }, 'Incoming request');    
        } catch (error) {         
            console.error('Logging error:', error);
            // TODO: Fallback logging
        }        
    }
    
    next();
}

}
