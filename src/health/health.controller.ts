import { Controller, Get } from '@nestjs/common';
import { readFile } from 'fs/promises';

@Controller(['/', 'health'])
export class HealthController {
  @Get()
  async checkHealth() {
    const version = await readFile('VERSION', 'utf8'); 
    return {
      status: 'ok',
      version: version.trim(), 
      timestamp: new Date().toISOString(),
    };
  }
}
