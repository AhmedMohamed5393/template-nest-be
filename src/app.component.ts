import { Controller, Get } from '@nestjs/common';
@Controller()
export class AppController {
  @Get("")
  gettingStarted(): string { return "E-Cardshop application is running on the server"; }
}