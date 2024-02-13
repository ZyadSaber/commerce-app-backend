import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { PageSetupService } from './page-setup.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('api/page_setup')
export class PageSetupController {
  constructor(private pageSetupService: PageSetupService) {}

  @Get('get_page_setup_data')
  getPageSetupData(
    @Query()
    params: {
      page_step: number;
      current_page: number;
    },
  ) {
    return this.pageSetupService.getPageSetupData(params);
  }

  @Post('post_page_setup_data')
  postPageSetupData(
    @Body()
    params: any,
  ) {
    return this.pageSetupService.postPageSetupData(params);
  }

  @Public()
  @Get('page_privilege')
  getPagePrivilege(@Query() params: { page_link: string; user_name: string }) {
    return this.pageSetupService.getPagePrivilege(params);
  }
}
