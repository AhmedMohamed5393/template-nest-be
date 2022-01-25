import { TemplateController } from './template.controller';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
    imports: [
        JwtModule.register({ secret: 'super-secret' }),
        MongooseModule.forFeature([]),
    ],
    controllers: [TemplateController],
})
export class TemplateModule {
    configure(consumer: MiddlewareConsumer) {}
}
