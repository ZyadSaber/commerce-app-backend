import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { SystemLabelsService } from './system-labels.service';
import { Public } from '../auth/decorators/public.decorator';
import { linkedLabelsPages } from './interface';

@Controller('api/system_labels')
export class SystemLabelsController {
  constructor(private systemLabelsService: SystemLabelsService) {}

  @Public()
  @Get('get_labels_table_data')
  getLabelsTableData() {
    return this.systemLabelsService.getLabelsTableData();
  }

  @Public()
  @Get('get_linked_labels_page')
  getLinkedLabelsPage(@Query() params: { label_id: string }) {
    return this.systemLabelsService.getLinkedLabelsPage(params);
  }

  @Post('post_linked_labels_page')
  postLinkedLabelsPage(@Body() dto: linkedLabelsPages[]) {
    return this.systemLabelsService.postLinkedLabelsPage(dto);
  }
}
