import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './orders.schema';

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) { }

    async createOrder(createOrderDto) {
        const newOrder = await this.orderModel.create({
            ...createOrderDto,
        });

        if (!newOrder) throw new NotFoundException(`Can't create order`);
        return newOrder;
    }
    //================================================================================
    async getOrdersWithProducts() {

        const aggregate = await this.orderModel.find().populate("productsList");
        console.log(aggregate)
        if (!aggregate) throw new NotFoundException(`Can't aggregate orders`);
        return aggregate;

    };

    async getOrders() {

        const allOrders = await this.orderModel.find()
        console.log(allOrders)
        if (!allOrders) throw new NotFoundException(`Can't allOrders`);
        return allOrders;
    };

    //================================================================================

}
