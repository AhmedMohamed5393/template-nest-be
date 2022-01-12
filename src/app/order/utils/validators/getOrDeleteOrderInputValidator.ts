import { IInputValidation } from "../../../shared/IInputValidation";
export class GetOrDeleteOrderInputValidation implements IInputValidation {
    public validateInputs(id: string): boolean { return !id ? false : true; }
}