import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; // new
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database/database.module';
import { PomodoroModule } from './pomodoro/pomodoro.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT,10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      logging: true,
      synchronize: true,
    }),
    DatabaseModule,
    TasksModule,
    PomodoroModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
