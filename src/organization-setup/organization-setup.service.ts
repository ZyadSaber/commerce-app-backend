import { Injectable } from '@nestjs/common';
import { GetMainTableParams } from './interface';

@Injectable()
export class OrganizationSetupService {
  async getOrganizationsData(params: GetMainTableParams) {}
}
