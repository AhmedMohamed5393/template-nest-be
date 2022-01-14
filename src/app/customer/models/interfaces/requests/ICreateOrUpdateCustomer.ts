export type ICustomersResponse = ICreateOrUpdateCustomer;
export interface ICreateOrUpdateCustomer {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    address?: string[];
}