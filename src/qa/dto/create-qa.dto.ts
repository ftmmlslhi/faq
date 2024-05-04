import { empty } from '@prisma/client/runtime/library';
import { IsBoolean, IsEmpty, IsNumber, IsString, isEmpty } from 'class-validator';

export class CreateQaDto {
  @IsString()
  question: string;
  @IsString()
  answer: string;
  view_count: 0;
  @IsEmpty()
  like_count: 0;
  @IsEmpty()
  dislike_count: 0;
  @IsBoolean()
  draft_status: boolean;
  @IsBoolean()
  public_status: boolean;
  @IsNumber()
  questionAnswer_Topic: number;
}
