import { ApiProperty } from '@nestjs/swagger';

export class MakePaymentResponse {
  @ApiProperty({ example: '2bdc69ee' })
  id: string;

  @ApiProperty({ example: 'pending' })
  status: string;

  @ApiProperty({
    example: {
      value: '1000.00',
      currency: 'RUB',
    },
  })
  amount: {
    value: string;
    currency: string;
  };

  @ApiProperty({ example: 'order №1' })
  description: string;

  @ApiProperty({
    example: {
      type: 'redirect',
      confirmation_url:
        'https://yoomoney.ru/checkout/payments/v2/contract?orderId=2bdc69ee',
    },
  })
  confirmation: {
    type: string;
    confirmation_url: string;
  };

  @ApiProperty({
    example: {
      account_id: '204577',
      gateway_id: '2025975',
    },
  })
  recipient: {
    account_id: string;
    gateway_id: string;
  };

  @ApiProperty({ example: true })
  test: boolean;

  @ApiProperty({ example: false })
  paid: boolean;

  @ApiProperty({ example: false })
  refundable: boolean;

  @ApiProperty({ example: {} })
  metadata: object;
}
