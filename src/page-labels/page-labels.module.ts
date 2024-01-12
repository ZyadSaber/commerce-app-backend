import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
import { PageLabelsController } from './page-labels.controller';
import { PageLabelsService } from './page-labels.service';

@Module({
  controllers: [PageLabelsController],
  providers: [PageLabelsService],
})
export class PageLabelsModule {}
