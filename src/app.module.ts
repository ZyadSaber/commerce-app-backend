import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaManageModule } from './prisma-manage/prisma-manage.module';
import { AppImagesModule } from './app_images/app_images.module';
import { PageLabelsModule } from './page-labels/page-labels.module';

@Module({
  imports: [
    AuthModule,
    PrismaManageModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AppImagesModule,
    PageLabelsModule,
  ],
})
export class AppModule {}
