import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { BoilerPartsService } from '../boiler-parts/boiler-parts.service';

import { ShoppingCart } from './shopping-cart.model';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart)
    private readonly shoppingCartModel: typeof ShoppingCart,
    private readonly userService: UserService,
    private readonly boilerPartsService: BoilerPartsService,
  ) {}

  findAll(userId: number | string): Promise<ShoppingCart[]> {
    return this.shoppingCartModel.findAll({ where: { userId } });
  }

  async add(addToCartDto: AddToCartDto) {
    const user = await this.userService.findByUsername(addToCartDto.username);
    const part = await this.boilerPartsService.findOne(addToCartDto.partId);

    const cart = await this.shoppingCartModel.create({
      userId: user.id,
      partId: part.id,
      boiler_manufacturer: part.boiler_manufacturer,
      parts_manufacturer: part.parts_manufacturer,
      price: part.price,
      name: part.name,
      image: JSON.parse(part.images)[0],
      in_stock: part.in_stock,
      total_price: part.price,
    });

    return cart;
  }

  async updateCount(
    count: number,
    partId: number | string,
  ): Promise<{ count: number }> {
    const [, [{ dataValues }]] = await this.shoppingCartModel.update(
      { count },
      { where: { partId }, returning: true },
    );

    return { count: dataValues.count };
  }

  async updateTotalPrice(
    total_price: number,
    partId: number | string,
  ): Promise<{ total_price: number }> {
    const [, [{ dataValues }]] = await this.shoppingCartModel.update(
      { total_price },
      { where: { partId }, returning: true },
    );

    return { total_price: dataValues.total_price };
  }

  async deleteOne(partId: number | string): Promise<number> {
    return await this.shoppingCartModel.destroy({ where: { partId } });
  }

  async deleteAll(userId: number | string): Promise<number> {
    return await this.shoppingCartModel.destroy({ where: { userId } });
  }
}
