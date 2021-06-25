import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';


@Controller('orders')
export class OrdersController {

    constructor(private ordersService: OrdersService) { }

    @Post("add")
    @HttpCode(HttpStatus.CREATED)
    createOrders(@Body() body) {
        return this.ordersService.createOrder(body)
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    getOrders() {
        return this.ordersService.getOrdersWithProducts()
        // return this.ordersService.getOrders()
    }

}
