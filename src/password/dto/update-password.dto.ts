import { IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePasswordDto {
    @ApiProperty()
    @IsString()
    @Length(3, 30)
    name?: string;

    @ApiProperty()
    @IsString()
    @Length(3, 30)
    password?: string;

    @ApiProperty()
    @IsString()
    @Length(3, 30)
    desc?: string;
}
