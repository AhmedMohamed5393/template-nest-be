import { Controller, Next, Post, Req, Res, Get, UnauthorizedException, Param, Body } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { logger } from "../shared/logger";
import { CustomerMapper } from "./mappers/customerMapper";
import { Customer, ICustomer } from "./models/entities/customer.model";
import { IService } from "./models/interfaces/classes/IService";
import { CustomerService } from "./services/customerService";
import { ApiCookieAuth, ApiTags } from "@nestjs/swagger";
import { admin } from "../../../data/admin";
import { ILoginRequest } from "./models/interfaces/requests/ILoginRequest";
const tag = "ecommerce-be:customer:service";
@ApiCookieAuth("token")
@ApiTags("")
@Controller("")
export class Service implements IService {
    private customerService: CustomerService;
    private customerMapper: CustomerMapper;
    constructor (private jwtService: JwtService, @InjectModel(Customer.name) private customerModel: Model<ICustomer>) {
        this.customerService = new CustomerService(this.customerModel);
        this.customerMapper = new CustomerMapper();
    }
    @Get("/api/customers")
    public async getCustomers(@Req() req: any, @Res() res: any, @Next() next: any): Promise<ICustomer[]> {
        try {
            const customers = await this.customerService.getCustomers();
            return res.status(200).json(customers);
        } catch (error) {
            const getCustomerByIdErrorMessage = { tag: tag + ":getCustomerById", message: "There is an error while signing in user", error, status: 500 };
            logger(getCustomerByIdErrorMessage);
            return res.status(500).json({ message: "Customer can't sign in" });
        }
    }
    @Get("/api/customer/:id")
    public async getCustomerById(@Param() params: any, @Res() res: any, @Next() next: any): Promise<ICustomer> {
        try {
            const customer = await this.customerService.getCustomer(params.id);
            return res.status(200).json(customer);
        } catch (error) {
            const getCustomerByIdErrorMessage = { tag: tag + ":getCustomerById", message: "There is an error while signing in user", error, status: 500 };
            logger(getCustomerByIdErrorMessage);
            return res.status(500).json({ message: "Customer can't sign in" });
        }
    }
    @Post("/api/login")
    public async login(@Body() body: ILoginRequest, @Res() res: any, @Next() next: any): Promise<any> {
        try {
            if (body.password !== admin.password || body.username !== admin.username) throw new UnauthorizedException("Credentials or username are incorrect");
            return res.status(200).json({ token: this.encodeToken(admin) });
        } catch (error) {
            const loginErrorMessage = { tag: tag + ":login", message: "There is an error while signing in user", error, status: 500 };
            logger(loginErrorMessage);
            return res.status(500).json({ message: "User can't sign in" });
        }
    }
    private encodeToken(user: ILoginRequest): string {
        try {
            const payload = this.customerMapper.prepareTokenPayload(user);
            return this.jwtService.sign(payload, { expiresIn: "7d" });
        } catch (error) {
            const encodeTokenErrorMessage = { tag: tag + ":encodeToken", message: "There is an error while getting user token", error, status: 500 };
            logger(encodeTokenErrorMessage);
        }
    }
}
