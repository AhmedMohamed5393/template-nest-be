import { ICustomer } from "../../entities/customer.model";
import { ICustomersResponse } from "../requests/ICreateOrUpdateCustomer";
import { ILoginRequest } from "../requests/ILoginRequest";
export interface IService {
    getCustomers(req: any, res: any, next: any): Promise<ICustomersResponse[]>;
    getCustomerById(params: any, res: any, next: any): Promise<ICustomer>;
    login(body: ILoginRequest, res: any, next: any): Promise<any>;
}
