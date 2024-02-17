import { IsNotEmpty, IsString } from 'class-validator';

export class PostParentsData {
  query_status: 'q' | 'n' | 'd' | 'u';
  @IsNotEmpty()
  @IsString()
  arab_page_parent_name: string;
  @IsNotEmpty()
  @IsString()
  eng_page_parent_name: string;
  hidden?: boolean;
  page_parent_id: number;
}
