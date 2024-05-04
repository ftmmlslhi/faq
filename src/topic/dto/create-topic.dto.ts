import { IsNumber, IsString } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  name: string;
  @IsNumber()
  Section_Topic: number;
  @IsNumber()
  questionAnswer_Topic: number;
}
