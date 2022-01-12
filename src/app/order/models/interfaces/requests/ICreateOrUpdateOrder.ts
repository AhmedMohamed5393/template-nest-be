import { ICreateOrUpdateCustomer } from "src/app/customer/models/interfaces/requests/ICreateOrUpdateCustomer";
import { IOrderItem } from "../IOrderItem";
export interface ICreateOrUpdateOrder{
    id?: string;
    customer: ICreateOrUpdateCustomer;
    items: IOrderItem[];
    store: string;
    address: string;
}
