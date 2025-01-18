import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto, userRole: string): Promise<Product> {
    if (userRole !== 'manager') {
      throw new UnauthorizedException('Only managers can add products.');
    }
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto, userRole: string): Promise<Product> {
    if (userRole !== 'manager') {
      throw new UnauthorizedException('Only managers can update products.');
    }
    await this.productRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: number, userRole: string): Promise<void> {
    if (userRole !== 'manager') {
      throw new UnauthorizedException('Only managers can delete products.');
    }
    await this.productRepository.delete(id);
  }
}
