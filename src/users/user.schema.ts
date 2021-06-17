import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ type: String, required: true, default: "testmail@tst.com" })
    email: string;

    @Prop({ type: String, required: false, default: "Boba" })
    firstName: string;

    @Prop({ type: String, required: false, default: "Dik" })
    lastName: string;

    @Prop({ type: String, required: false, default: "25" })
    age: string;

    @Prop({ type: String, required: true, default: "manager" })
    role: string;

    @Prop({ type: String, required: true, default: "123456" })
    verificationCode: string;

    @Prop({ type: String, default: Date.now() })
    dateCreated: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);