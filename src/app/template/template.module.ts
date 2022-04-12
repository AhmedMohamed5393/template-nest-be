import { TemplateController } from './template.controller';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports: [
        JwtModule.register({ secret: 'super-secret' }),
    ],
    controllers: [TemplateController],
})
export class TemplateModule {
    configure(consumer: MiddlewareConsumer) {}
}
