import { IInputValidation } from "../../../shared/interfaces/IInputValidation";
export class GetOrDeleteCustomerInputValidation implements IInputValidation {
    public validateInputs(id: string): boolean { return !id ? false : true; }
}