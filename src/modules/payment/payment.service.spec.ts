import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import axios from 'axios';
import { MakePaymentDto } from './dto/make-payment.dto';
import { ForbiddenException } from '@nestjs/common';

describe('PaymentService', () => {
  let paymentService: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService],
    }).compile();

    paymentService = module.get<PaymentService>(PaymentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('makePayment', () => {
    it('should make a payment successfully', async () => {
      const mockResponse = { data: { status: 'success' } };
      const makePaymentDto: MakePaymentDto = {
        amount: 100,
      };

      jest.spyOn(axios, 'post').mockResolvedValueOnce(mockResponse);

      const result = await paymentService.makePayment(makePaymentDto);

      expect(axios.post).toBeCalledWith(...paymentRequestArgs(makePaymentDto));
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw a ForbiddenException when payment fails', async () => {
      const mockError = new Error('Payment failed');
      const makePaymentDto: MakePaymentDto = {
        amount: 100,
      };

      jest.spyOn(axios, 'post').mockRejectedValueOnce(mockError);

      await expect(paymentService.makePayment(makePaymentDto)).rejects.toThrow(
        ForbiddenException,
      );

      expect(axios.post).toBeCalledWith(...paymentRequestArgs(makePaymentDto));
    });
  });
});

function paymentRequestArgs(makePaymentDto: MakePaymentDto) {
  return [
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
        'Idempotence-Key': expect.any(Number),
      },
      auth: {
        username: process.env.YOOKASA_USERNAME,
        password: process.env.YOOKASA_TOKEN,
      },
    },
  ];
}
