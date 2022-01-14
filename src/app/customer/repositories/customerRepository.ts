import { logger } from "../../shared/logger";
import { isValidObjectId } from "mongoose";
import { ICustomerRepository } from "../models/interfaces/classes/ICustomerRepository";
import { ICustomer } from "../models/entities/customer.model";
import { ICreateOrUpdateCustomer } from "../models/interfaces/requests/ICreateOrUpdateCustomer";
const tag = "ecommerce-be:customer:customerRepository";
export class CustomerRepository implements ICustomerRepository {
    constructor(private customerModel) {}
    public async getCustomers(): Promise<ICustomer[]> {
        try {
            return await this.customerModel.find().lean();
        } catch (error) {
            const getCustomersErrorMessage = { tag: tag + ":getCustomers", message: "Can't get customers data", error, status: 500 };
            logger(getCustomersErrorMessage);
        }
    }
    public async getCustomer(idOrNameOrEmail: string): Promise<ICustomer> {
        try {
            if (isValidObjectId(idOrNameOrEmail)) return await this.customerModel.findById(idOrNameOrEmail).lean();
            else {
                const queryArray = [{ email: idOrNameOrEmail }, { name: idOrNameOrEmail }];
                return await this.customerModel.findOne({ $or: queryArray }).lean();
            }
        } catch (error) {
            const getCustomerErrorMessage = { tag: tag + ":getCustomer", message: "Can't get customer data", error, status: 500 };
            logger(getCustomerErrorMessage);
        }
    }
    public async createCustomer(customerData: ICreateOrUpdateCustomer): Promise<ICustomer> {
        try {
            return await this.customerModel.create(customerData);
        } catch (error) {
            const createCustomerErrorMessage = { tag: tag + ":createCustomer", message: "Can't create customer", error, status: 500 };
            logger(createCustomerErrorMessage);
        }
    }
    public async updateCustomer(customerData: ICreateOrUpdateCustomer): Promise<ICustomer> {
        try {
            return await this.customerModel.findOneAndUpdate({ _id: customerData._id }, customerData, { new: true, omitUndefined: true }).lean();
        } catch (error) {
            const updateCustomerErrorMessage = { tag: tag + ":updateCustomer", message: "Can't update customer", error, status: 500 };
            logger(updateCustomerErrorMessage);
        }
    }
}
