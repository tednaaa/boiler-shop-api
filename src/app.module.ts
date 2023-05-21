import { Module } from '@nestjs/common';

import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { BoilerPartsModule } from './modules/boiler-parts/boiler-parts.module';
import { ShoppingCartModule } from './modules/shopping-cart/shopping-cart.module';
import { PaymentModule } from './modules/payment/payment.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DatabaseModule,
    BoilerPartsModule,
    ShoppingCartModule,
    PaymentModule,
  ],
})
export class AppModule {}
