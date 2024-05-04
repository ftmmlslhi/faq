import {
    IsString,
    IsBoolean,
    IsNotEmpty
  } from 'class-validator'

export class CreateSectionDto{
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsBoolean()
    draft_status: boolean;
    @IsBoolean()
    public_status: boolean;
    Section_Topic: number;
}
