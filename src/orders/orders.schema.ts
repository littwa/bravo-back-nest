import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

import { Customer, CustomerSchema } from 'src/customers/customers.schema'; // check how it works
import { ICustomer, IDate } from 'src/shared/interfaces/prop.interfaces';
import { Product } from 'src/products/products.schema';


export type OrderDocument = Order & Document;

@Schema()
export class Order extends Document {
    @Prop({ type: String, required: true })
    orderNo: string;

    @Prop({ type: Types.ObjectId, ref: 'Customer' })
    customerId: Customer;

    @Prop({ type: String, required: true, })
    customer: string;

    @Prop({ type: String, required: true, })
    customerNo: string;

    @Prop({ type: String, default: '' })
    items: string;

    @Prop({ type: String, required: true })
    notes: string;

    @Prop({ type: String, default: 'new', enum: ['new', 'canceled', 'in progress', 'deliverred', 'completed',] })
    status: string;

    @Prop({ type: Object, required: true })
    ordered: IDate;

    @Prop({ type: Object, required: true })
    reqDelivery: IDate;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
    productsList: Product[];

    //@Prop({ type: [CustomerSchema] })
    // productsList: ICustomer[]; //  Сheck how it works  ?????????

}

export const OrderSchema = SchemaFactory.createForClass(Order);

