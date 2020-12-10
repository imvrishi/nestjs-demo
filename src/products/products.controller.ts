import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const productId = await this.productsService.insert(
      title,
      description,
      price,
    );
    return { id: productId };
  }

  @Get()
  async getProducts() {
    return await this.productsService.getProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return await this.productsService.getProduct(id);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    await this.productsService.update(id, title, description, price);
    return null;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    await this.productsService.delete(id);
    return null;
  }
}
