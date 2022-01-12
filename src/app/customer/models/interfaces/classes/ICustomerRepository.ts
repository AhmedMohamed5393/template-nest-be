import { ICustomer } from "../../entities/customer.model";
import { ICreateOrUpdateCustomer } from "../requests/ICreateOrUpdateCustomer";
export interface ICustomerRepository {
    getCustomers(): Promise<ICustomer[]>;
    getCustomer(idOrNameOrEmail: string): Promise<ICustomer>;
    createCustomer(customerData: ICreateOrUpdateCustomer): Promise<ICustomer>;
    updateCustomer(customerData: ICreateOrUpdateCustomer): Promise<ICustomer>;
}
