import { IsNotEmpty } from 'class-validator';

export class linkedLabelsPages {
  @IsNotEmpty()
  label_id: string;
  page_id?: string | number;
  component_id?: string;
  status: boolean;
}
