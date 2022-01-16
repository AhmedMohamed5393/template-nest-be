import { IInputValidation } from "../../../shared/interfaces/IInputValidation";
export class GetOrDeleteOrderInputValidation implements IInputValidation {
    public validateInputs(id: string): boolean { return !id ? false : true; }
}