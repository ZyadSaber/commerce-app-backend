import { IsNotEmpty, IsString } from 'class-validator';

export class linkedLabelsPages {
  @IsNotEmpty()
  label_id: string;
  page_id?: string | number;
  component_id?: string;
  status: boolean;
  @IsNotEmpty()
  query_status: 'q' | 'u';
}

export class PostLabelsTableDataType {
  @IsNotEmpty()
  @IsString()
  label_id: string;
  eng_label: string;
  arab_label: string;
  @IsNotEmpty()
  query_status: 'n' | 'u' | 'd';
}
