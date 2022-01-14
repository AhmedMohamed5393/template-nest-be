import { IOrder } from "../../entities/order.model";
import { IOrdersResponse } from "../responses/IOrdersResponse";
export interface IService {
    getOrders(req: any, res: any, next: any): Promise<IOrdersResponse[]>;
    getOrderById(params: any, res: any, next: any): Promise<IOrder>;
    createOrder(body: any, res: any, next: any): Promise<any>;
}
