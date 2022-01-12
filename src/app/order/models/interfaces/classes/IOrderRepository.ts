import { IOrder } from "../../entities/order.model";
export interface IOrderRepository {
    getOrders(): Promise<IOrder[]>;
    getOrderById(orderId: string): Promise<IOrder>;
    createOrder(orderData: IOrder): Promise<IOrder>;
}
