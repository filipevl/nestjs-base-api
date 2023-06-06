import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { HttpException, Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/exception.filter';
import { AppModule } from './ioC/app.module';
import * as net from 'net';
import { swaggerConfig } from './docs/swaggerConfig';

function wait() {
  const timer = setInterval(() => {
    const socket = net.connect(5432, 'db', () => {
      clearInterval(timer);
      socket.destroy();
    });

    socket.on('error', () => {
      throw new HttpException("Database it'is not avaliable", 500);
    });
  }, 1000);
}

async function bootstrap() {
  const logger = new Logger('bootstrap');
  wait();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/v2');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(process.env.PORT, () => {
    logger.log('Backend listening on: ' + process.env.PORT);
  });
}

bootstrap();
