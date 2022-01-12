export interface ICreateOrUpdateCustomer {
    _id?: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address?: string[];
}