import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { PomodoroModule } from './pomodoro/pomodoro.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TasksModule,
    PomodoroModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
