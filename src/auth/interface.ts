import { IsNotEmpty, IsString } from 'class-validator';

export class signInType {
  @IsString()
  @IsNotEmpty()
  user_name: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserPermissionType {
  @IsNotEmpty()
  user_permissions_id: number;
  @IsNotEmpty()
  status: boolean;
  page_permissions?: {
    can_add?: boolean;
    can_delete?: boolean;
    can_edit?: boolean;
    can_print?: boolean;
  };
}
