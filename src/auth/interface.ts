import { IsNotEmpty, IsString } from 'class-validator';

export class signInType {
  @IsString()
  @IsNotEmpty()
  user_name: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
