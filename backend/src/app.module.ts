import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
       isGlobal: true,
    }),
    
    PrismaModule,
    TasksModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
