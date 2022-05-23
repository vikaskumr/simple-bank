import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    if (exception.response) {
      const httpStatus = exception.response.status
        ? exception.response.status
        : HttpStatus.INTERNAL_SERVER_ERROR;

      const responseBody = {
        err: {
          reason: exception.response.message
            ? exception.response.message
            : exception.response.data,
          statusCode: httpStatus,
          code: exception.code ? exception.code : exception.response.status,
        },

        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
      };

      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);

      return;
    }

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      err: {
        reason: exception.message,
        statusCode: httpStatus,
        code: exception.code,
      },
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
