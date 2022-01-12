import { IInputValidation } from "../../../shared/IInputValidation";
import { ICreateOrUpdateOrder } from "../../models/interfaces/requests/ICreateOrUpdateOrder";
export class CreateOrUpdateOrderInputValidation implements IInputValidation {
    public validateInputs(body: ICreateOrUpdateOrder): boolean { return !body ? false : true; }
}