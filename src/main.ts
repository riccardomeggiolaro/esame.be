/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { GlobalExceptionFilter } from '@core/exception-filters/global.exception.filter';
import { ResponseInterceptor } from '@core/interceptors/response/response.interceptor';
import { ValidationException } from '@core/exceptions/validator.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(compression());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        }));
        return new ValidationException(formattedErrors);
      },
    }),
  )
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();