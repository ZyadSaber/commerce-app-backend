import { Module } from '@nestjs/common';
import { PageSetupService } from './page-setup.service';
import { PageSetupController } from './page-setup.controller';

@Module({
  providers: [PageSetupService],
  controllers: [PageSetupController],
})
export class PageSetupModule {}
