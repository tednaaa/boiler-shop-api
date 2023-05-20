import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersModule } from '../users [draft]/users.module';
import { BoilerPartsModule } from '../boiler-parts/boiler-parts.module';

import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCart } from './shopping-cart.model';

@Module({
  imports: [
    SequelizeModule.forFeature([ShoppingCart]),
    UsersModule,
    BoilerPartsModule,
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
})
export class ShoppingCartModule {}
