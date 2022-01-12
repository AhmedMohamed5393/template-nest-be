import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { logger } from "../../../shared/logger";
import { CreateCustomerInputValidation } from "../validators/createCustomerInputValidator";
const tag = "ecommerce-be:customer:createCustomerMiddleware";
export class CreateCustomerMiddleware implements NestMiddleware {
    public use(req: any, res: any, next: () => void) {
        try {
            const isValid = new CreateCustomerInputValidation().validateInputs(req.body);
            if (isValid) next();
            else throw new BadRequestException("Invalid input");
        } catch (error) {
            const middlewareErrorMessage = { tag, message: "Invalid input", error, status: 400 };
            logger(middlewareErrorMessage);
            return res.status(400).json({ message: "Invalid input" });
        }
    }
}
