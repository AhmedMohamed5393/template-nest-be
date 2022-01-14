import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import * as env from "./environment";
import { SwaggerModule } from "@nestjs/swagger";
import { config } from "./documentation";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = env.PORT;
  app.use(cookieParser());
  app.enableCors({
    origin: env.FRONTEND_HOST,
    methods: "GET, POST, PUT ,PATCH, DELETE, OPTIONS",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Content-Language, Accept, Authorization, token, Set-Cookie, Cookie",
    credentials: true,
  });
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(port);
}
bootstrap();
