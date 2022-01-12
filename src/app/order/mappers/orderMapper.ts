import { logger } from "../../shared/logger";
import { IOrder } from "../models/entities/order.model";
import { IOrderItem } from "../models/interfaces/IOrderItem";
import { ICreateOrUpdateOrder } from "../models/interfaces/requests/ICreateOrUpdateOrder";
const tag = "ecommerce:order:orderMapper";
export class OrderMapper {
    public async getOrderMapper(orderData: ICreateOrUpdateOrder): Promise<IOrder> {
        try {
            const total = this.calculateTotalCostAndAmount(orderData.items);
            let order = {} as IOrder;
            order.address = orderData.address;
            order.store = orderData.store;
            order.items = orderData.items;
            order.totalAmount = total.amount;
            order.totalPrice = total.cost;
            return order;
        } catch (error) {
            const getOrderMapperErrorMessage = { tag: tag + ":getOrderMapper", message: "There is an error while mapping order", error, status: 500 };
            logger(getOrderMapperErrorMessage);
        }
    }
    private calculateTotalCostAndAmount(items: IOrderItem[]): any {
        try {
            let cost = 0, amount = 0;
            for (const item of items) {
                cost += item.amount * item.price;
                amount += item.amount;
            }
            return { cost, amount };
        } catch (error) {
            const calculateTotalCostAndAmountErrorMessage = {
                tag: tag + ":calculateTotalCostAndAmount",
                message: "There is an error while calculating total cost and amount of order",
                error,
                status: 500,
            };
            logger(calculateTotalCostAndAmountErrorMessage);
        }
    }
}
