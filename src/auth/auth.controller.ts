import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { signInType } from './interface';

@Controller('api/auth_security')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign_in')
  signIn(@Body() dto: signInType) {
    return this.authService.signIn(dto);
  }

  @UseGuards(AuthGuard)
  @Get('app_pages')
  getAppPages(@Query() params: { user_name: string }) {
    return this.authService.getUserPage(params);
  }
}
