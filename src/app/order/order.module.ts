import { Service } from './service';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './models/entities/order.model';
import { AuthorizeMiddleware } from '../shared/middlewares/authorizeMiddleware';
import { CreateOrUpdateOrderMiddleware } from './utils/middlewares/createOrUpdateOrderMiddleware';
import { GetOrDeleteOrderMiddleware } from './utils/middlewares/getOrDeleteOrderMiddleware';
import { Customer, CustomerSchema } from '../customer/models/entities/customer.model';
@Module({
    imports: [
        JwtModule.register({ secret: 'super-secret' }),
        MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
        MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
    ],
    controllers: [Service],
})
export class OrderModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply().forRoutes({ path: "/api/orders", method: RequestMethod.GET });
        consumer.apply(AuthorizeMiddleware, GetOrDeleteOrderMiddleware).forRoutes({ path: "/api/order/:id", method: RequestMethod.GET });
        consumer.apply(AuthorizeMiddleware, CreateOrUpdateOrderMiddleware).forRoutes({ path: "/api/order/create", method: RequestMethod.POST });
    }
}
