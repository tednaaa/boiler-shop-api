import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { MakePaymentDto } from './dto/make-payment.dto';
import { PaymentService } from './payment.service';
import { MakePaymentResponse } from './types';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @ApiOkResponse({ type: MakePaymentResponse })
  @UseGuards(AuthenticatedGuard)
  @Post()
  makePayment(@Body() makePaymentDto: MakePaymentDto) {
    return this.paymentService.makePayment(makePaymentDto);
  }
}
