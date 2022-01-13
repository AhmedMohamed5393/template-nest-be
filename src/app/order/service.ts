import { Controller, Next, Post, Req, Res, Get, HttpStatus, Param, Body, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { logger } from "../shared/logger";
import { OrderMapper } from "./mappers/orderMapper";
import { IOrder, Order } from "./models/entities/order.model";
import { IService } from "./models/interfaces/classes/IService";
import { OrderService } from "./services/orderService";
import { CustomerService } from "../customer/services/customerService";
import { Customer, ICustomer } from "../customer/models/entities/customer.model";
import { stores } from "../../../data/stores";
import { IProduct } from "../../../data/IStore";
import { ICreateOrUpdateOrder } from "./models/interfaces/requests/ICreateOrUpdateOrder";
const tag = "ecommerce-be:order:service";
@Controller("")
export class Service implements IService {
    private customerService: CustomerService;
    private orderService: OrderService;
    private orderMapper: OrderMapper;
    constructor (@InjectModel(Order.name) private orderModel: Model<IOrder>, @InjectModel(Customer.name) private customerModel: Model<ICustomer>) {
        this.customerService = new CustomerService(this.customerModel);
        this.orderService = new OrderService(this.orderModel);
        this.orderMapper = new OrderMapper();
    }
    @Get("/api/orders")
    public async getOrders(@Req() req: any, @Res() res: any, @Next() next: any): Promise<IOrder[]> {
        try {
            const orders = await this.orderService.getOrders();
            return res.status(200).json(orders);
        } catch (error) {
            const getOrdersErrorMessage = { tag: tag + ":getOrders", message: "There is an error while getting all orders", error, status: 500 };
            logger(getOrdersErrorMessage);
            return res.status(500).json({ message: "Can't get orders" });
        }
    }
    @Get("/api/order/:id")
    public async getOrderById(@Param() params: any, @Res() res: any, @Next() next: any): Promise<IOrder> {
        try {
            const order = await this.orderService.getOrderById(params.id);
            return res.status(200).json(order);
        } catch (error) {
            const getOrderByIdErrorMessage = { tag: tag + ":getOrderById", message: "There is an error while getting order by id", error, status: 500 };
            logger(getOrderByIdErrorMessage);
            return res.status(500).json({ message: "Can't get order" });
        }
    }
    @Post("/api/order/create")
    public async createOrder(@Body() body: ICreateOrUpdateOrder, @Res() res: any, @Next() next: any): Promise<any> {
        try {
            const itemsWithoutAmount: IProduct[] = [];
            const orderData = await this.orderMapper.getOrderMapper(body);
            const orderStore = stores.find((store) => store.name === orderData.store);
            if (!orderStore) throw new InternalServerErrorException("This store isn't found");
            for (const item of body.items) {
                if (!orderStore.products.includes(item)) itemsWithoutAmount.push({ name: item.name, unit: item.unit, price: item.price });
            }
            if (itemsWithoutAmount.length !== body.items.length) throw new InternalServerErrorException("These products aren't found in the selected store");
            const customerData = body.customer;
            const customer = await this.customerService.getCustomer(customerData.email);
            customerData.address = [];
            if (!customer) {
                customerData.address.push(orderData.address);
                await this.customerService.createCustomer(customerData);
            }
            else {
                if (!customer.address.includes(orderData.address.trim())) customerData.address.push(orderData.address);
                await this.customerService.updateCustomer(customerData);
            }
            orderData.customerEmail = customerData.email;
            const order = await this.orderService.createOrder(orderData);
            return res.status(201).json({ message: "Order is created successfuly", status: HttpStatus.CREATED, order });
        } catch (error) {
            const createOrderErrorMessage = { tag: tag + ":createOrder", message: "There is an error while creating order", error, status: 500 };
            logger(createOrderErrorMessage);
            return res.status(500).json({ message: "Order can't be created", status: HttpStatus.INTERNAL_SERVER_ERROR });
        }
    }
}
