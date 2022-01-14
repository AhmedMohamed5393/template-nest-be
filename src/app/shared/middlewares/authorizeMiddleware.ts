import { Injectable, NestMiddleware } from "@nestjs/common";
import { logger } from "../logger";
const tag = "ecommerce-be:authorizeMiddleware";
@Injectable()
export class AuthorizeMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        try {
            if (req.cookies && req.cookies.token) next();
        } catch (error) {
            const middlewareErrorMessage = { tag, message: "Unauthorized", error, status: 401 };
            logger(middlewareErrorMessage);
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
}
