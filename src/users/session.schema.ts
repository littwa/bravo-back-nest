import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { Order } from 'src/orders/orders.schema';

export type SessionDocument = Session & Document;

@Schema()
export class Session extends Document {
    @Prop({ type: Types.ObjectId }) // check
    uid: Types.ObjectId;


    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
    // ordersList: Order[];

    // uid: { type: Schema.Types.ObjectId },

    //     @Prop({ type: ObjectId, ref: "Good" })
    //    favoritCustomers: ObjectId
}

export const SessionSchema = SchemaFactory.createForClass(Session);