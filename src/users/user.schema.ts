import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { Order } from 'src/orders/orders.schema';
import { Customer } from 'src/customers/customers.schema';


export type UserDocument = User & Document;

@Schema()
export class User extends Document {
    @Prop({ type: String, required: true, default: "testmail@tst.com" })
    email: string;

    @Prop({ type: String, required: false, default: "Boba" })
    firstName: string;

    @Prop({ type: String, required: false, default: "Dik" })
    lastName: string;

    @Prop({ type: String, required: false, default: "25" })
    age: string;

    @Prop({ type: String, required: true, enum: ["customer", "admin"] })
    role: string;

    @Prop({ type: String, default: "" })
    verificationCode: string;

    @Prop({ type: String, default: Date.now() })
    dateCreated: Date;

    @Prop({ type: String, default: "", required: false })
    password: string

    @Prop({ type: String, default: "", required: false })
    username: string

    @Prop({ type: String, default: "", required: false })
    avatarURL: string

    @Prop({
        type: String,
        required: true,
        enum: ["Not Verified", "Verified", "Not Required Verification"],
        default: "Not Required Verification",
    })
    status: string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
    ordersList: Order[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: false })
    customer: Customer;

}

export const UserSchema = SchemaFactory.createForClass(User);