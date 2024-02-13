import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { SystemLabelsService } from './system-labels.service';
import { Public } from '../auth/decorators/public.decorator';
import { linkedLabelsPages, PostLabelsTableDataType } from './interface';

@Controller('api/system_labels')
export class SystemLabelsController {
  constructor(private systemLabelsService: SystemLabelsService) {}

  @Public()
  @Get('get_labels_table_data')
  getLabelsTableData(
    @Query()
    params: {
      page_step: number;
      current_page: number;
    },
  ) {
    return this.systemLabelsService.getLabelsTableData(params);
  }

  @Get('get_linked_labels_page')
  getLinkedLabelsPage(@Query() params: { label_id: string }) {
    return this.systemLabelsService.getLinkedLabelsPage(params);
  }

  @Post('post_linked_labels_page')
  postLinkedLabelsPage(@Body() dto: linkedLabelsPages[]) {
    return this.systemLabelsService.postLinkedLabelsPage(dto);
  }

  @Public()
  @Get('get_linked_labels')
  getLinkedLabels(
    @Query()
    params: {
      page_name?: string;
      component_name?: string;
      p_language: number | string;
    },
  ) {
    return this.systemLabelsService.getLinkedLabels(params);
  }

  @Post('post_labels_table_data')
  postLabelsTableData(@Body() dto: PostLabelsTableDataType) {
    return this.systemLabelsService.postLabelsTableData(dto);
  }
}
