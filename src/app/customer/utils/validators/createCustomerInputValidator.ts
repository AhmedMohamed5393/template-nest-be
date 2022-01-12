import { IInputValidation } from "../../../shared/IInputValidation";
import { ICreateOrUpdateCustomer } from "../../models/interfaces/requests/ICreateOrUpdateCustomer";
export class CreateCustomerInputValidation implements IInputValidation {
    public validateInputs(body: ICreateOrUpdateCustomer): boolean { return !body ? false : true; }
}
