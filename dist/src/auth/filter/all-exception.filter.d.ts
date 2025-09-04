import { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
export declare class AllExceptionFilter implements ExceptionFilter {
    private readonly loggger;
    catch(exception: any, host: ArgumentsHost): void;
}
