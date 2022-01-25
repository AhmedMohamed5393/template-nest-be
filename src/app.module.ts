import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as env from "./environment";
import { AppController } from './app.component';
import { TemplateModule } from './app/template/template.module';
@Module({
    imports: [
        MongooseModule.forRoot(env.DBURI),
        TemplateModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
