import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from "./products.service"

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    getProducts() {
        return this.productsService.getProducts()
    }

    @Post("/add")
    @HttpCode(HttpStatus.CREATED)
    addProduct(@Body() body) {
        return this.productsService.addProduct(body)
    }

    @Patch("update/:productId")
    @HttpCode(HttpStatus.OK)
    updateProduct(@Body() body, @Param() param) {
        return this.productsService.updateProduct(body, param.productId)
    }

    @Delete("del/:productId")
    @HttpCode(HttpStatus.OK)
    delProduct(@Param() param) {
        return this.productsService.deleteProduct(param.productId)
    }

}
