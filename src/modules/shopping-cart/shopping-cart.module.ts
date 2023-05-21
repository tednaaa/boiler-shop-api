import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserModule } from '../user/user.module';
import { BoilerPartsModule } from '../boiler-parts/boiler-parts.module';

import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCart } from './shopping-cart.model';

@Module({
  imports: [
    SequelizeModule.forFeature([ShoppingCart]),
    UserModule,
    BoilerPartsModule,
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
})
export class ShoppingCartModule {}
