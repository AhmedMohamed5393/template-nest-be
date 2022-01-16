import { logger } from "../../shared/logger";
import { ICustomer } from "../models/entities/customer.model";
import { ICreateOrUpdateCustomer, ICustomersResponse } from "../models/interfaces/requests/ICreateOrUpdateCustomer";
const tag = "ecardshop-be:customer:customerMapper";
export class CustomerMapper {
    public prepareTokenPayload(user: any): any {
        try {
            const payload = { name: user.username, role: user.role };
            return payload;
        } catch (error) {
            const prepareTokenPayloadErrorMessage = { tag: tag + ":prepareTokenPayload", message: "There is an error while preparing user token", error };
            logger(prepareTokenPayloadErrorMessage);
        }
    }
    public getCustomerMapper(customerData: ICreateOrUpdateCustomer): ICreateOrUpdateCustomer {
        try {
            let customer = {} as ICreateOrUpdateCustomer;
            customer._id = customerData._id;
            customer.name = customerData.name;
            customer.email = customerData.email;
            customer.phone = customerData.phone;
            customer.address = customerData.address;
            return customer;
        } catch (error) {
            const getCustomerMapperErrorMessage = { tag: tag + ":getCustomerMapper", message: "There is an error while preparing customer data", error };
            logger(getCustomerMapperErrorMessage);
        }
    }
    public async mapICustomersToICustomersResponse(customers: ICustomer[]): Promise<ICustomersResponse[]> {
        try {
            let mappedCustomer = {} as ICustomersResponse;
            const mappedCustomers = [] as ICustomersResponse[];
            for (const customer of customers) {
                mappedCustomer._id = customer._id;
                mappedCustomer.name = customer.name;
                mappedCustomer.email = customer.email;
                mappedCustomer.phone = customer.phone;
                mappedCustomer.address = customer.address;
                mappedCustomers.push(mappedCustomer);
            }
            return mappedCustomers;
        } catch (error) {
            const mapICustomersToICustomersResponseMapperErrorMessage = {
                tag: tag + ":mapICustomersToICustomersResponseMapper",
                message: "There is an error while mapping customers data",
                error,
            };
            logger(mapICustomersToICustomersResponseMapperErrorMessage);
        }
    }
}
