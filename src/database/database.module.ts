import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

import { SequelizeConfigService } from './sequelize-config.service';
import { databaseConfig } from './config';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    ConfigModule.forRoot({ load: [databaseConfig] }),
  ],
})
export class DatabaseModule {}
