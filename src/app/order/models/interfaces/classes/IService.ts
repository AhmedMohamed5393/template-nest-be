import { IOrder } from "../../entities/order.model";
export interface IService {
    getOrders(req: any, res: any, next: any): Promise<IOrder[]>;
    getOrderById(params: any, res: any, next: any): Promise<IOrder>;
    createOrder(body: any, res: any, next: any): Promise<any>;
}
