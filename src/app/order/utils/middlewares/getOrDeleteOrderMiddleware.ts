import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { logger } from "../../../shared/logger";
import { GetOrDeleteOrderInputValidation } from "../validators/getOrDeleteOrderInputValidator";
const tag = "ecardshop-be:order:getOrDeleteOrderMiddleware";
export class GetOrDeleteOrderMiddleware implements NestMiddleware {
    public use(req: any, res: any, next: () => void) {
        try {
            const isValid = new GetOrDeleteOrderInputValidation().validateInputs(req.params.id);
            if (isValid) next();
            else throw new BadRequestException("Invalid order id");
        } catch (error) {
            const middlewareErrorMessage = { tag, message: "Internal Server Error", error, status: 500 };
            logger(middlewareErrorMessage);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
