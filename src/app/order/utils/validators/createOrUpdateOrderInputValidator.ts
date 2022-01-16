import { ICreateOrUpdateCustomer } from "../../../customer/models/interfaces/requests/ICreateOrUpdateCustomer";
import { TypeValidators } from "../../../shared/validators/typeValidators";
import { IInputValidation } from "../../../shared/interfaces/IInputValidation";
import { IOrderItem } from "../../models/interfaces/IOrderItem";
import { ICreateOrUpdateOrder } from "../../models/interfaces/requests/ICreateOrUpdateOrder";
import { logger } from "../../../shared/logger";
const tag = "ecardshop-be:order:createOrUpdateOrderInputValidation";
export class CreateOrUpdateOrderInputValidation implements IInputValidation {
    private typeValidators: TypeValidators;
    constructor () { this.typeValidators = new TypeValidators(); }
    public validateInputs(body: ICreateOrUpdateOrder): any {
        try {
            let errorMessages = [];
            const validateAddressAndStore = this.typeValidators.areStrings([{ key: "Address", value: body.address }, { key: "Store", value: body.store }]);
            const validateItemsData = this.validateItemsArray(body.items);
            const validateCustomerData = this.validateCustomerData(body.customer);
            errorMessages = errorMessages.concat(validateAddressAndStore.errorMessages, validateItemsData.errorMessages, validateCustomerData.errorMessages);
            errorMessages = errorMessages.filter((errorMessage) => errorMessage);
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const validateInputsErrorMessage = { tag: tag + ":validateInputs", message: "internal server error", error, status: 500 };
            logger(validateInputsErrorMessage);
        }
    }
    private validateItemsArray(items: IOrderItem[]): any {
        try {
            let errorMessages = [];
            const isArray = this.typeValidators.areArrays([{ key: "Product Items", value: items }]);
            if (isArray.errorMessages) errorMessages = errorMessages.concat(isArray.errorMessages);
            else {
                for (const item of items) {
                    const isObject = this.typeValidators.areObjects([{ key: "Each Product", value: item }]);
                    if (isObject.errorMessages) errorMessages = errorMessages.concat(isObject.errorMessages);
                    else {
                        const validateName = this.typeValidators.areStrings([{ key: "Product name", value: item.name }]);
                        const validateUnitCurrency = this.typeValidators.areCurrencyCodes([{ key: "Product Unit", value: item.unit }]);
                        const validatePriceAndAmount = this.typeValidators.areNumbers([{ key: "Product Price", value: item.price }, { key: "Product Amount", value: item.amount }]);
                        errorMessages = errorMessages.concat(validateName.errorMessages, validateUnitCurrency.errorMessages, validatePriceAndAmount.errorMessages);
                    }
                }
            }
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const validateItemsArrayErrorMessage = { tag: tag + ":validateItemsArray", message: "internal server error", error, status: 500 };
            logger(validateItemsArrayErrorMessage);
        }
    }
    private validateCustomerData(customer: ICreateOrUpdateCustomer): any {
        try {
            let errorMessages = [];
            const isObject = this.typeValidators.areObjects([{ key: "Customer Data", value: customer }]);
            if (isObject.errorMessages) errorMessages = errorMessages.concat(isObject.errorMessages);
            else {
                const validateCustomerName = this.typeValidators.areStrings([{ key: "CustomerName", value: customer.name }]);
                const validateCustomerEmail = this.typeValidators.areEmails([{ key: "CustomerEmail", value: customer.email }]);
                const validateCustomerPhone = this.typeValidators.arePhones([{ key: "CustomerPhone", value: customer.phone }]);
                errorMessages = errorMessages.concat(validateCustomerName.errorMessages, validateCustomerEmail.errorMessages, validateCustomerPhone.errorMessages);
            }
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const validateCustomerDataErrorMessage = { tag: tag + ":validateCustomerData", message: "internal server error", error, status: 500 };
            logger(validateCustomerDataErrorMessage);
        }
    }
}
