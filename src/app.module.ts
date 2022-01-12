import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './app/order/order.module';
import { CustomerModule } from './app/customer/customer.module';
import * as env from "./environment";
@Module({ imports: [MongooseModule.forRoot(env.DBURI), CustomerModule, OrderModule] })
export class AppModule {}
