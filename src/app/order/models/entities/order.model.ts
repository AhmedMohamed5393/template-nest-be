import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";
import { IOrderItem } from "../interfaces/IOrderItem";
export type IOrder = Order & Document;
@Schema()
export class Order {
    @Prop({ required: true, type: Array }) items: IOrderItem[];
    @Prop({ required: true, type: Number }) totalAmount: number;
    @Prop({ required: true, type: Number }) totalPrice: number;
    @Prop({ required: true, type: String }) store: string;
    @Prop({ required: true, type: String }) address: string;
    @Prop({ required: true, type: String }) customerEmail: string;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
