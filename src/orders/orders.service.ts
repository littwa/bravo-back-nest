import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/products/products.schema';
import { Order, OrderDocument } from './orders.schema';

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>, @InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

    async createOrder(createOrderDto) {
        const newOrder = await this.orderModel.create({
            ...createOrderDto,
        });

        if (!newOrder) throw new NotFoundException(`Can't create order`);
        return newOrder;
    }

    async getOrdersWithProducts() {

        const aggregate = await this.orderModel.find().populate("productsList");
        if (!aggregate) throw new NotFoundException(`Can't aggregate orders`);
        return aggregate;

    };

    async getOrders() {

        const allOrders = await this.orderModel.find()
        if (!allOrders) throw new NotFoundException(`Can't allOrders`);
        return allOrders;
    };

    async changeStatusToConfirmed(orderId) {

        let updatedOrder: any = await this.orderModel.findByIdAndUpdate(
            orderId,
            {
                $set: { status: true },
            },
            {
                new: true,
                useFindAndModify: false,
            },
        );

        updatedOrder = false;

        if (!updatedOrder) throw new NotFoundException(`Can't change status order id:${orderId} to confirmed`);
        return updatedOrder;
    };

    async updateOrder(updatedOrderDto, orderId) {

        const updatedOrder = await this.orderModel.findByIdAndUpdate(
            orderId,
            { $set: updatedOrderDto },
            { new: true, useFindAndModify: false },
        );

        if (!updatedOrder) throw new NotFoundException(`Can't updated order`);
        return updatedOrder

    };

    async deleteOrder(orderId) {

        const deletedOrder = await this.orderModel.findByIdAndDelete(orderId);
        if (!deletedOrder) throw new NotFoundException(`Can't del customer`);
        return `Customer ById: ${orderId} has been successfully deleted!`;

    };

    async addProductsToOrder(body, orderId) {

        const product = await this.productModel.findById(body.productId);
        console.log(product)
        if (!product) throw new NotFoundException(`Can't find products for for in this order`);

        const updatedUser = await this.orderModel.findByIdAndUpdate(orderId, {
            $push: { productsList: body.productId }
        }, { new: true });

        console.log(product);

        if (!updatedUser) throw new NotFoundException(`Can't add products in this order`);

        return updatedUser;

    };

    async removeProductsFromOrder(body, orderId) {

        const product = await this.productModel.findById(body.productId);
        console.log(product)
        if (!product) throw new NotFoundException(`Can't find products for for in this order`);

        const updatedUser = await this.orderModel.findByIdAndUpdate(orderId, {
            $pull: { productsList: body.productId }
        }, { new: true });

        return updatedUser;

    }

}


