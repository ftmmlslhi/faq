import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class SearchAnswerDto{
    @IsString()
    @IsNotEmpty()
    question : string
}