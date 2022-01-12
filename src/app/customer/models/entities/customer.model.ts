import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from "mongoose";
export type ICustomer = Customer & Document;
@Schema()
export class Customer {
    @Prop({ required: true, type: String }) @ApiProperty({ example: "Ahmed Mohamed", description: 'Customer name' }) name: string;
    @Prop({ required: true, type: String }) @ApiProperty({ example: "ahmed.mohamed@modeso.ch", description: 'Customer email' }) email: string;
    @Prop({ required: true, type: String }) @ApiProperty({ example: "hamada5393", description: 'Customer password' }) password: string;
    @Prop({ required: true, type: String }) @ApiProperty({ example: 1, description: 'The age of the Cat' }) phone: string;
    @Prop({ required: false, type: Array }) @ApiProperty() address: string[];
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);
