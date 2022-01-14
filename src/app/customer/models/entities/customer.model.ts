import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";
export type ICustomer = Customer & Document;
@Schema()
export class Customer {
    @Prop({ required: true, type: String }) name: string;
    @Prop({ required: true, type: String }) email: string;
    @Prop({ required: true, type: String }) phone: string;
    @Prop({ required: false, type: Array }) address: string[];
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);
