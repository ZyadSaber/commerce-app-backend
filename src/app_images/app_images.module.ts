import { Module } from '@nestjs/common';
import { AppImagesController } from './app_images.controller';

@Module({
  controllers: [AppImagesController]
})
export class AppImagesModule {}
