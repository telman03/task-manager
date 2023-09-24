// src/database/database.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Task from '../tasks/entities/task.entity';

@Module({
    imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Task])],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
