import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({ example: 'Bob' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  readonly userId?: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  readonly partId: number;
}
