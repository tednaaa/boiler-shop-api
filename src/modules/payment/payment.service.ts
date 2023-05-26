import { ForbiddenException, Injectable } from '@nestjs/common';
import { MakePaymentDto } from './dto/make-payment.dto';
import axios from 'axios';

@Injectable()
export class PaymentService {
  async makePayment(makePaymentDto: MakePaymentDto) {
    try {
      const { data } = await axios.post(
        'https://api.yookassa.ru/v3/payments',
        {
          amount: {
            value: makePaymentDto.amount,
            currency: 'RUB',
          },
          capture: true,
          confirmation: {
            type: 'redirect',
            return_url: 'http://localhost:3000/order',
          },
          description: 'order №1',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Idempotence-Key': Date.now(),
          },
          auth: {
            username: process.env.YOOKASA_USERNAME,
            password: process.env.YOOKASA_TOKEN,
          },
        },
      );

      return data;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
