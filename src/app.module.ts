import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; // new
import { TasksModule } from './tasks/tasks.module';

import { DatabaseModule } from './database/database.module';
// import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
    ), 
    DatabaseModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
