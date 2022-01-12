import { IInputValidation } from "../../../shared/IInputValidation";
export class LoginInputValidator implements IInputValidation {
    public validateInputs(body: any): boolean { return !body.username || !body.password ? false : true; }
}