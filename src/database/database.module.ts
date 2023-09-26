// src/database/database.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';


@Module({
    imports: [
        
        ConfigModule.forRoot({ envFilePath: ['.env'] }),

    ],
    exports: [],
})
export class DatabaseModule {}
