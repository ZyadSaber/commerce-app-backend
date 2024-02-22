import { IsNotEmpty } from 'class-validator';

export class PaginationTyp {
  @IsNotEmpty()
  current_page: number;
  @IsNotEmpty()
  page_step: number;
}
