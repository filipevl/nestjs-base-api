import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('API NAME')
  .setDescription('api description')
  .setVersion('version')
  .build();
