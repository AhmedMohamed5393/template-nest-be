import { Module } from '@nestjs/common';
import * as env from "./environment";
import { AppController } from './app.component';
import { TemplateModule } from './app/template/template.module';
@Module({
    imports: [
        TemplateModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
