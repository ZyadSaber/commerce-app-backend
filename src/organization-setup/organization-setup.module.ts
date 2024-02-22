import { Module } from '@nestjs/common';
import { OrganizationSetupController } from './organization-setup.controller';
import { OrganizationSetupService } from './organization-setup.service';

@Module({
  controllers: [OrganizationSetupController],
  providers: [OrganizationSetupService]
})
export class OrganizationSetupModule {}
