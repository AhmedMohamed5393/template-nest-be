import { Controller } from "@nestjs/common";
import { ITemplateController } from "./models/interfaces/classes/ITemplateController";
const tag = "template-be:template:controller";
@Controller("")
export class TemplateController implements ITemplateController {
    constructor () {}
}
