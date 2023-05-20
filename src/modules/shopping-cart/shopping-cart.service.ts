import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UsersService } from '../users [draft]/users.service';
import { BoilerPartsService } from '../boiler-parts/boiler-parts.service';

import { ShoppingCart } from './shopping-cart.model';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart) private shoppingCartModel: typeof ShoppingCart,
    private readonly usersService: UsersService,
    private readonly boilerPartsService: BoilerPartsService,
  ) {}

  findAll(userId: number | string): Promise<ShoppingCart[]> {
    return this.shoppingCartModel.findAll({ where: { userId } });
  }

  async add(addToCartDto: AddToCartDto) {
    const cart = new ShoppingCart();
    const user = await this.usersService.findOne({
      where: { username: addToCartDto.username },
    });

    const part = await this.boilerPartsService.findOne(addToCartDto.partId);

    cart.userId = user.id;
    cart.partId = part.id;
    cart.boiler_manufacturer = part.boiler_manufacturer;
    cart.parts_manufacturer = part.parts_manufacturer;
    cart.price = part.price;
    cart.name = part.name;
    cart.image = JSON.parse(part.images)[0];
    cart.in_stock = part.in_stock;
    cart.total_price = part.price;

    return cart.save();
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
