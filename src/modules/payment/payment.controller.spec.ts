import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { MakePaymentDto } from './dto/make-payment.dto';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { MakePaymentResponse } from './types';

describe('PaymentController', () => {
  let paymentController: PaymentController;
  let paymentService: PaymentService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PaymentController],
    })
      .useMocker(createMock)
      .compile();

    paymentController = moduleRef.get<PaymentController>(PaymentController);
    paymentService = moduleRef.get<PaymentService>(PaymentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('makePayment', () => {
    it('should make a payment successfully', async () => {
      const makePaymentDto: MakePaymentDto = {
        amount: 100,
      };

      const mockResponse: MakePaymentResponse = {
        status: 'success',
        id: '',
        amount: {
          value: '',
          currency: '',
        },
        description: '',
        confirmation: {
          type: '',
          confirmation_url: '',
        },
        recipient: {
          account_id: '',
          gateway_id: '',
        },
        test: false,
        paid: false,
        refundable: false,
        metadata: undefined,
      };

      jest
        .spyOn(paymentService, 'makePayment')
        .mockResolvedValueOnce(mockResponse);

      const result = await paymentController.makePayment(makePaymentDto);

      expect(paymentService.makePayment).toBeCalledTimes(1);
      expect(paymentService.makePayment).toBeCalledWith(makePaymentDto);
      expect(result).toEqual(mockResponse);
    });
  });
});
