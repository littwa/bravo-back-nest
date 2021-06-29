import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

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

    @Prop({ type: String, required: true, enum: ["manager", "customer", "admin"] })
    role: string;

    @Prop({ type: String, default: "" })
    verificationCode: string;

    @Prop({ type: String, default: Date.now() })
    dateCreated: Date;

    @Prop({ type: String, default: "", required: false })
    password: string

    @Prop({ type: String, default: "", required: false })
    avatarURL: string

    @Prop({
        type: String,
        required: true,
        enum: ["Not Verified", "Verified", "Not Required Verification"],
        default: "Not Required Verification",
    })
    status: string

    @Prop({ type: String, default: "", required: false })
    verificationToken: string

    @Prop({ type: String, default: "", required: false })
    sessionToken: string

    @Prop({ type: String, default: "", required: false })
    accessToken: string


    //     @Prop({ type: ObjectId, ref: "Good" })
    //    favoritCustomers: ObjectId
}

export const UserSchema = SchemaFactory.createForClass(User);