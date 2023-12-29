import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('app_images')
export class AppImagesController {
  @Get('primary_logo')
  getImage(@Res() res: Response) {
    const file = createReadStream(
      join(process.cwd(), './src/app_images/assets/logo_4.png'),
    );
    file.pipe(res);
  }
}
