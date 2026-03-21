import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class AppController {
  @Get()
  health() {
    return {
      message: 'Task App API is running',
      docs: '/api',
      endpoints: ['/api/users', '/api/tasks'],
    };
  }
}

