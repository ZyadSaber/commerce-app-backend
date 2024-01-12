import {
  // Body,
  Controller,
  // Delete,
  Get,
  // Post,
  // Put,
  // Query,
} from '@nestjs/common';

// @UseGuards(AuthGuard)
@Controller('api/system_options')
export class PageLabelsController {
  @Get('test')
  getdd() {
    return 'dd';
  }
}
