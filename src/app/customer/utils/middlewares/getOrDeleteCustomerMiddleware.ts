import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { logger } from "src/app/shared/logger";
import { GetOrDeleteCustomerInputValidation } from "../validators/getOrDeleteCustomerInputValidator";
const tag = "ecommerce-be:customer:getOrDeleteCustomerMiddleware";
export class GetOrDeleteCustomerMiddleware implements NestMiddleware {
    public use(req: any, res: any, next: () => void) {
        try {
            const isValid = new GetOrDeleteCustomerInputValidation().validateInputs(req.params.id);
            if (isValid) next();
            else throw new BadRequestException("Invalid input");
        } catch (error) {
            const middlewareErrorMessage = { tag, message: "Invalid input", error, status: 400 };
            logger(middlewareErrorMessage);
            return res.status(400).json({ message: "Invalid input" });
        }
    }
}
