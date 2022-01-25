import { Injectable } from "@nestjs/common";
import { ITemplateService } from "../models/interfaces/classes/ITemplateService";
import { TemplateRepository } from "../repositories/templateRepository";
const tag = "template-be:template:templateService";
@Injectable()
export class TemplateService implements ITemplateService {
    private templateRepository: TemplateRepository;
    constructor() { this.templateRepository = new TemplateRepository(); }
}
