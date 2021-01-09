import {
  Controller,
  Param,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Redirect,
  HttpCode,
  HttpStatus,
  Header,
  Req,
  Res,
} from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';2
import { UpdateProductDto } from './dto/update-product.dto';

// import { Request, Response } from 'express';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Below example of Redirect and Express handling requests
  //
  // @Get()
  // @Redirect('https://google.com', 301)
  // getAll(@Req() req: Request, @Res() res: Response): string {
  //   res.status(201).end('Bye');
  //   return 'getAll';
  // }

  @Get()
  getAll() {
    return this.productsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): string {
    return `getOne ${this.productsService.getById(id)}`;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-control', 'none')
  create(@Body() createProductDto: CreateProductDto): void {
    return this.productsService.create(createProductDto);
  }

  @Delete()
  remove(@Param('id') id: string) {
    return `Remove ${id}`;
  }

  @Put()
  update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string) {
    return `Update ${id}`;
  }
}
