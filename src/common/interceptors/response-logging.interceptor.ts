import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  import { logger } from '../../config/logger';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {    
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const now = Date.now();
      const ctx = context.switchToHttp();
      const request = ctx.getRequest();
      const response = ctx.getResponse();
  
      return next
        .handle()
        .pipe(
          tap(() => {
            const { method, url } = request;
            const statusCode = response.statusCode;
            const delay = Date.now() - now;
                                
            try {
                // Log the request and response details along with execution time
                logger.info({ method, url, statusCode, delay }, 'Request processed');                
            } catch (error) {         
                console.error('Logging error:', error);
                // TODO: Fallback logging
            }                   
          }),
        );
    }
  }
  