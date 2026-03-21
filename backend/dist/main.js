"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    const port = process.env.PORT || 3001;
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Task App API')
        .setDescription('Community Task App backend API')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('', app, document, { useGlobalPrefix: true });
    await app.listen(port);
    console.log(`🚀 Server running on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map