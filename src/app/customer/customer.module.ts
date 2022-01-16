import { Service } from './service';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './models/entities/customer.model';
import { AuthorizeMiddleware } from '../shared/middlewares/authorizeMiddleware';
import { GetOrDeleteCustomerMiddleware } from './utils/middlewares/getOrDeleteCustomerMiddleware';
import { LoginMiddleware } from './utils/middlewares/loginMiddleware';
@Module({
    imports: [
        JwtModule.register({ secret: 'super-secret' }),
        MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
    ],
    controllers: [Service],
})
export class CustomerModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoginMiddleware).forRoutes({ path: "/api/login", method: RequestMethod.POST });
        consumer.apply(AuthorizeMiddleware).forRoutes({ path: "/api/customers", method: RequestMethod.GET });
        consumer.apply(GetOrDeleteCustomerMiddleware).forRoutes({ path: "/api/customer/:id", method: RequestMethod.GET });
    }
}
