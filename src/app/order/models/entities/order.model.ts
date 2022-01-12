import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from "mongoose";
import { IOrderItem } from "../interfaces/IOrderItem";
export type IOrder = Order & Document;
@Schema()
export class Order {
    @Prop({ required: true, type: Array }) @ApiProperty() items: IOrderItem[];
    @Prop({ required: true, type: Number }) @ApiProperty() totalAmount: number;
    @Prop({ required: true, type: Number }) @ApiProperty() totalPrice: number;
    @Prop({ required: true, type: String }) @ApiProperty() store: string;
    @Prop({ required: true, type: String }) @ApiProperty() address: string;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
