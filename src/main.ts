import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvConfiguration } from './config/env.config';
import 'colors';
import { LoggerService } from './config/logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { LoggingInterceptor } from './config/interceptors/logger';
import { ResponseInterceptor } from './config/interceptors/response';
import { TimeoutInterceptor } from './config/interceptors/timeout';
import { AllExceptionFilter } from './config/filters/index';
import { ValidationPipe } from '@nestjs/common/pipes';
import { SwaggerConfig } from './config/swagger/swagger';
import { Logger } from '@nestjs/common';

async function main() {
  const logger = new LoggerService();
  const configService = new ConfigService();

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

  
  SwaggerConfig.ConfigSwaggerModule(app);

  await app.listen(EnvConfiguration().portServer);
}
main().then(() => {
  const logger = new Logger('NestApplication');
  logger.log(
    `Servidor corriendo en el puerto ${EnvConfiguration().portServer}`,
  );
});
