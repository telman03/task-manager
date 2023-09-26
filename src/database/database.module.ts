// src/database/database.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Task from '../tasks/entities/task.entity';
import { ConfigModule } from '@nestjs/config';


@Module({
    imports: [
        
        ConfigModule.forRoot({ envFilePath: ['.env'] }),

    ],
    exports: [],
})
export class DatabaseModule {}
