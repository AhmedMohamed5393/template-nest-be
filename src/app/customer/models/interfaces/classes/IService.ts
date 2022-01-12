import { ICustomer } from "../../entities/customer.model";
import { ILoginRequest } from "../requests/ILoginRequest";
export interface IService {
    getCustomers(req: any, res: any, next: any): Promise<ICustomer[]>;
    getCustomerById(params: any, res: any, next: any): Promise<ICustomer>;
    login(body: ILoginRequest, res: any, next: any): Promise<any>;
}
