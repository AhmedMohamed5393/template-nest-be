import { Injectable } from "@nestjs/common";
import { logger } from "../../shared/logger";
import { ICustomer } from "../models/entities/customer.model";
import { ICustomerService } from "../models/interfaces/classes/ICustomerService";
import { ICreateOrUpdateCustomer } from "../models/interfaces/requests/ICreateOrUpdateCustomer";
import { CustomerRepository } from "../repositories/customerRepository";
const tag = "ecardshop-be:customer:customerService";
@Injectable()
export class CustomerService implements ICustomerService {
    private customerRepository: CustomerRepository;
    constructor(private customerModel) { this.customerRepository = new CustomerRepository(customerModel); }
    public async getCustomers(): Promise<ICustomer[]> {
        try {
            return await this.customerRepository.getCustomers();
        } catch (error) {
            const getCustomersErrorMessage = { tag: tag + ":getCustomers", message: "There is an error while getting customers", error, status: 500 };
            logger(getCustomersErrorMessage);
        }
    }
    public async getCustomer(idOrNameOrEmail: string): Promise<ICustomer> {
        try {
            return await this.customerRepository.getCustomer(idOrNameOrEmail);
        } catch (error) {
            const getCustomerErrorMessage = { tag: tag + ":getCustomer", message: "There is an error while getting customer", error, status: 500 };
            logger(getCustomerErrorMessage);
        }
    }
    public async createCustomer(customerData: ICreateOrUpdateCustomer): Promise<ICustomer> {
        try {
            return await this.customerRepository.createCustomer(customerData);
        } catch (error) {
            const createCustomerErrorMessage = { tag: tag + ":createCustomer", message: "There is an error while creating customer", error, status: 500 };
            logger(createCustomerErrorMessage);
        }
    }
    public async updateCustomer(customerData: ICreateOrUpdateCustomer | ICustomer): Promise<ICustomer> {
        try {
            return await this.customerRepository.updateCustomer(customerData);
        } catch (error) {
            const updateCustomerErrorMessage = { tag: tag + ":updateCustomer", message: "There is an error while updating customer", error, status: 500 };
            logger(updateCustomerErrorMessage);
        }
    }
}
