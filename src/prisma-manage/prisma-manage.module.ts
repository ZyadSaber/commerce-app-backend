import { Module, Global } from '@nestjs/common';
import { PrismaManageService } from './prisma-manage.service';

@Global()
@Module({
  providers: [PrismaManageService],
  exports: [PrismaManageService],
})
export class PrismaManageModule {}
