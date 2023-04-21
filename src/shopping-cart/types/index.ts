import { ApiProperty } from '@nestjs/swagger';

class ShoppingCartItem {
  @ApiProperty({ example: 40 })
  partId: number;

  @ApiProperty({ example: 3182 })
  price: number;

  @ApiProperty({ example: 9 })
  in_stock: number;

  @ApiProperty({ example: 0 })
  count: number;

  @ApiProperty({ example: 3182 })
  total_price: number;

  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 2 })
  userId: number;

  @ApiProperty({ example: 'Northwest' })
  boiler_manufacturer: string;

  @ApiProperty({ example: 'Radian' })
  parts_manufacturer: string;

  @ApiProperty({ example: 'Nam ratione.' })
  name: string;

  @ApiProperty({
    example:
      'https://loremflickr.com/640/480/technics?random=966387009186129689675007961683',
  })
  image: string;

  @ApiProperty({ example: '2023-04-21T21:23:13.227Z' })
  updatedAt: string;

  @ApiProperty({ example: '2023-04-21T21:23:13.227Z' })
  createdAt: string;
}

export class GetAllResponse extends ShoppingCartItem {}

export class AddToCartResponse extends ShoppingCartItem {}

export class UpdateCountRequest {
  @ApiProperty({ example: 1 })
  count: number;
}
export class UpdateCountResponse {
  @ApiProperty({ example: 1 })
  count: number;
}

export class UpdateTotalPriceRequest {
  @ApiProperty({ example: 10000 })
  total_price: number;
}
export class UpdateTotalPriceResponse {
  @ApiProperty({ example: 10000 })
  total_price: number;
}
