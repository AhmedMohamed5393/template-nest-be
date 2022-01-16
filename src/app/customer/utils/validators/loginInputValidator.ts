import { logger } from "src/app/shared/logger";
import { TypeValidators } from "src/app/shared/validators/typeValidators";
import { IInputValidation } from "../../../shared/interfaces/IInputValidation";
import { ILoginRequest } from "../../models/interfaces/requests/ILoginRequest";
const tag = "ecardshop-be:customer:loginInputValidator";
export class LoginInputValidator implements IInputValidation {
    private typeValidators: TypeValidators;
    constructor() { this.typeValidators = new TypeValidators(); }
    public validateInputs(body: ILoginRequest): any {
        try {
            const areStrings = this.typeValidators.areStrings([{ key: "User Name", value: body.username }, { key: "Password", value: body.password }]);
            return areStrings;
        } catch (error) {
            const validateInputsErrorMessage = { tag: tag + ":validateInputs", message: "Internal Server Error", error, status: 500 };
            logger(validateInputsErrorMessage);
        }
    }
}