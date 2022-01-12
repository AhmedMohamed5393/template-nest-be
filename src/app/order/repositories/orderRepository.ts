import { logger } from "../../shared/logger";
import { IOrderRepository } from "../models/interfaces/classes/IOrderRepository";
import { IOrder } from "../models/entities/order.model";
const tag = "ecommerce-be:order:orderRepository";
export class OrderRepository implements IOrderRepository {
    constructor(private orderModel) {}
    public async getOrders(): Promise<IOrder[]> {
        try {
            return await this.orderModel.find().lean();
        } catch (error) {
            const getOrdersErrorMessage = { tag: tag + ":getOrders", message: "Can't get all orders data", error, status: 500 };
            logger(getOrdersErrorMessage);
        }
    }
    public async getOrderById(orderId: string): Promise<IOrder> {
        try {
            return await this.orderModel.findById(orderId).lean();
        } catch (error) {
            const getOrderByIdErrorMessage = { tag: tag + ":getOrderById", message: "Can't get order data by id", error, status: 500 };
            logger(getOrderByIdErrorMessage);
        }
    }
    public async createOrder(orderData: IOrder): Promise<IOrder> {
        try {
            return await this.orderModel.create(orderData);
        } catch (error) {
            const createOrderErrorMessage = { tag: tag + ":createOrder", message: "Can't create order", error, status: 500 };
            logger(createOrderErrorMessage);
        }
    }
}
