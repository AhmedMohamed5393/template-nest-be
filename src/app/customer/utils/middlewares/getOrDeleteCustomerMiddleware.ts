import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { logger } from "src/app/shared/logger";
import { GetOrDeleteCustomerInputValidation } from "../validators/getOrDeleteCustomerInputValidator";
const tag = "ecardshop-be:customer:getOrDeleteCustomerMiddleware";
export class GetOrDeleteCustomerMiddleware implements NestMiddleware {
    public use(req: any, res: any, next: () => void) {
        try {
            const isValid = new GetOrDeleteCustomerInputValidation().validateInputs(req.params.id);
            if (isValid) next();
            else throw new BadRequestException("Invalid customer id");
        } catch (error) {
            const middlewareErrorMessage = { tag, message: "Internal Server Error", error, status: 500 };
            logger(middlewareErrorMessage);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
