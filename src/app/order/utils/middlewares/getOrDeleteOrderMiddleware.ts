import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { logger } from "../../../shared/logger";
import { GetOrDeleteOrderInputValidation } from "../validators/getOrDeleteOrderInputValidator";
const tag = "ecommerce-be:order:getOrDeleteOrderMiddleware";
export class GetOrDeleteOrderMiddleware implements NestMiddleware {
    public use(req: any, res: any, next: () => void) {
        try {
            const isValid = new GetOrDeleteOrderInputValidation().validateInputs(req.params.id);
            if (isValid) next();
            else throw new BadRequestException("Invalid input");
        } catch (error) {
            const middlewareErrorMessage = { tag, message: "Invalid input", error, status: 400 };
            logger(middlewareErrorMessage);
            return res.status(400).json({ message: "Invalid input" });
        }
    }
}
