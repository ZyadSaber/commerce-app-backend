import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { PrismaManageModule } from './prisma-manage/prisma-manage.module';
import { AppImagesModule } from './app_images/app_images.module';
import { SystemLabelsModule } from './system-labels/system-labels.module';
import { PageSetupModule } from './page-setup/page-setup.module';
import { PagesParentModule } from './pages-parent/pages-parent.module';
import { OrganizationSetupModule } from './organization-setup/organization-setup.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build'),
    }),
    AuthModule,
    PrismaManageModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AppImagesModule,
    SystemLabelsModule,
    PageSetupModule,
    PagesParentModule,
    OrganizationSetupModule,
  ],
})
export class AppModule {}
