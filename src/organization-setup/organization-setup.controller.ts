import { Controller, Get, Query } from '@nestjs/common';
import { OrganizationSetupService } from './organization-setup.service';
import { GetMainTableParams } from './interface';

@Controller('api/organizations_setup')
export class OrganizationSetupController {
  constructor(private organizationSetupService: OrganizationSetupService) {}

  @Get('get_organizations_main_table_data')
  getOrganizationsData(@Query() params: GetMainTableParams) {
    return this.organizationSetupService.getOrganizationsData(params);
  }
}
