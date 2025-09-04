import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateListDto {
    @ApiProperty()
    @IsString()
    @Length(3, 30)
    name: string;
}
