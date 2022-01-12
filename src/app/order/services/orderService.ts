import { Injectable } from "@nestjs/common";
import { logger } from "../../shared/logger";
import { IOrder } from "../models/entities/order.model";
import { IOrderService } from "../models/interfaces/classes/IOrderService";
import { OrderRepository } from "../repositories/orderRepository";
const tag = "ecommerce-be:order:orderService";
@Injectable()
export class OrderService implements IOrderService {
    private orderRepository: OrderRepository;
    constructor(private orderModel) { this.orderRepository = new OrderRepository(this.orderModel); }
    public async getOrders(): Promise<IOrder[]> {
        try {
            return await this.orderRepository.getOrders();
        } catch (error) {
            const getOrdersErrorMessage = { tag: tag + ":getOrders", message: "There is an error while getting all orders", error, status: 500 };
            logger(getOrdersErrorMessage);
        }
    }
    public async getOrderById(orderId: string): Promise<IOrder> {
        try {
            return await this.orderRepository.getOrderById(orderId);
        } catch (error) {
            const getOrderByIdErrorMessage = { tag: tag + ":getOrderById", message: "There is an error while getting order by id", error, status: 500 };
            logger(getOrderByIdErrorMessage);
        }
    }
    public async createOrder(orderData: IOrder): Promise<IOrder> {
        try {
            return await this.orderRepository.createOrder(orderData);
        } catch (error) {
            const createOrderErrorMessage = { tag: tag + ":createOrder", message: "There is an error while updating order", error, status: 500 };
            logger(createOrderErrorMessage);
        }
    }
}
