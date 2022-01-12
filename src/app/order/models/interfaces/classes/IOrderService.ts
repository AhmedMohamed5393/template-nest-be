import { IOrder } from "../../entities/order.model";
export interface IOrderService {
    getOrders(): Promise<IOrder[]>;
    getOrderById(orderId: string): Promise<IOrder>;
    createOrder(orderData: IOrder): Promise<IOrder>;
}
