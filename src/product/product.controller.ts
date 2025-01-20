import { Controller, Get, Post, Patch, Delete, Body, Param, Req, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @Req() req) {
    const userRole = req.user?.role;
    return this.productService.create(createProductDto, userRole);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
  ): Promise<Product[]> {
    const skip = (page - 1) * limit;
    return this.productService.findAll(skip, limit, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Req() req) {
    const userRole = req.user?.role;
    return this.productService.update(+id, updateProductDto, userRole);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    const userRole = req.user?.role;
    return this.productService.remove(+id, userRole);
  }
}
