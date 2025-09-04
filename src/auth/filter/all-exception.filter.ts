import { Catch, ExceptionFilter, ArgumentsHost, HttpException, Logger } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    private readonly loggger = new Logger (AllExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception instanceof HttpException ? exception.getStatus() :500;
        const message = exception.message || 'Interval sever error';

        this.loggger.error(`Status: ${status}, Message: ${message}`);

        response.status(status).json({
            statusCode: status,
            message: message || 'Interval sever error',
            error: exception.name || 'UnknownError',
            stack: exception.stack || null,
            timeStamp: new Date().toISOString(),
        })
    }
}