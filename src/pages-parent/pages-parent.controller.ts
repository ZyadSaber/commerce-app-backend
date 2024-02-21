import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { PagesParentService } from './pages-parent.service';
import { PostParentsData } from './interface';

@Controller('api/pages_parent')
export class PagesParentController {
  constructor(private pagesParentService: PagesParentService) {}

  @Get('get_parents_table_data')
  getParentsTableData(
    @Query()
    params: {
      page_step: number;
      current_page: number;
    },
  ) {
    return this.pagesParentService.getParentsTableData(params);
  }

  @Post('post_parents_table_data')
  postParentsTableData(
    @Body()
    dto: PostParentsData,
  ) {
    return this.pagesParentService.postParentsTableData(dto);
  }

  @Get('get_parents_list')
  getParentsList(
    @Query()
    params: {
      p_language: number | string;
    },
  ) {
    return this.pagesParentService.getParentsList(params);
  }
}
