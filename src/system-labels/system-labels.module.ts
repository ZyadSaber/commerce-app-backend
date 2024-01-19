import { Module } from '@nestjs/common';
import { SystemLabelsController } from './system-labels.controller';
import { SystemLabelsService } from './system-labels.service';

@Module({
  controllers: [SystemLabelsController],
  providers: [SystemLabelsService]
})
export class SystemLabelsModule {}
