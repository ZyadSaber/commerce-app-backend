import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInType, UserPermissionType } from './interface';
import { Public } from './decorators/public.decorator';

@Controller('api/auth_security')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('validate_user_logged_in')
  validate_user_logged_in() {
    return { response: 'success' };
  }

  @Public()
  @Post('sign_in')
  signIn(@Body() dto: signInType) {
    return this.authService.signIn(dto);
  }

  @Get('get_users_data')
  getUsersData(@Query() params: { user_name: string }) {
    return this.authService.getUsersData(params);
  }

  @Get('app_pages')
  getAppPages(@Query() params: { user_name: string }) {
    return this.authService.getUserPage(params);
  }

  @Get('get_pages_permission')
  getPagesPermission(@Query() params: { user_id: string }) {
    return this.authService.getPagesPermission(params);
  }

  @Post('post_pages_permissions')
  postPagesPermission(@Body() dto: UserPermissionType[]) {
    return this.authService.postPagesPermission(dto);
  }

  @Public()
  @Post('post_users_table_data')
  postUserData(@Body() dto: any) {
    return this.authService.postUserData(dto);
  }
}
