import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'colors';
import { LoggerService } from './config/logger/logger.service';
import { LoggingInterceptor } from './config/interceptors/logger';
import { ResponseInterceptor } from './config/interceptors/response';
import { TimeoutInterceptor } from './config/interceptors/timeout';
import { AllExceptionFilter } from './config/filters/index';
import { ValidationPipe } from '@nestjs/common/pipes';

async function main() {
  const logger = new LoggerService();

  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(
    new LoggingInterceptor(logger),
    new ResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  app.useGlobalFilters(new AllExceptionFilter(logger));

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,

      forbidNonWhitelisted: true,

      transform: true,

      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  
  app.setGlobalPrefix('api/v1/');

  

  await app.listen(3000);
}

main()