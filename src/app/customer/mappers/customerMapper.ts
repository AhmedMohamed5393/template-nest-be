import { logger } from "../../shared/logger";
import { ICreateOrUpdateCustomer } from "../models/interfaces/requests/ICreateOrUpdateCustomer";
const tag = "management:customer:customerMapper";
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
    public getCustomerMapper(customerData: ICreateOrUpdateCustomer, hashedPassword: string): ICreateOrUpdateCustomer {
        try {
            let customer = {} as ICreateOrUpdateCustomer;
            customer.name = customerData.name;
            customer.email = customerData.email;
            customer.password = hashedPassword;
            customer.phone = customerData.phone;
            return customer;
        } catch (error) {
            const prepareTokenPayloadErrorMessage = { tag: tag + ":prepareTokenPayload", message: "There is an error while preparing customer token", error };
            logger(prepareTokenPayloadErrorMessage);
        }
    }
}
