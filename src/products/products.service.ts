import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insert(title: string, description: string, price: number) {
    const newProduct = new this.productModel({ title, description, price });
    const result = await newProduct.save();
    return result.id;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      price: p.price,
    }));
  }

  async getProduct(productId: string) {
    const product = await this.productModel.findById(productId).exec();
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async update(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const product = await this.productModel.findById(productId).exec();
    if (title) {
      product.title = title;
    }
    if (description) {
      product.description = description;
    }
    if (price) {
      product.price = price;
    }
    await product.save();
  }

  async delete(productId: string) {
    await this.productModel.findByIdAndDelete(productId).exec();
  }
}
