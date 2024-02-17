import { Module } from '@nestjs/common';
import { PagesParentController } from './pages-parent.controller';
import { PagesParentService } from './pages-parent.service';

@Module({
  controllers: [PagesParentController],
  providers: [PagesParentService]
})
export class PagesParentModule {}
