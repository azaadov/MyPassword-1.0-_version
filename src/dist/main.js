"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const custom_logger_1 = require("./logging/custom.logger");
const all_exception_filter_1 = require("./auth/filter/all-exception.filter");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Medium')
        .setDescription('Medium clone')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
    })
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    app.useGlobalFilters(new all_exception_filter_1.AllExceptionFilter());
    app.useLogger(app.get(custom_logger_1.MyLogger));
    await app.listen(process.env.PORT ?? 4000, () => {
        console.log("server running: " + 4000);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map