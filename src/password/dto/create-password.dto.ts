import { IsMongoId, IsNotEmpty, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePasswordDto {
    @ApiProperty()
    @IsString()
    @Length(3, 30)
    name: string;

    @ApiProperty()
    @IsString()
    @Length(3, 30)
    password: string;

    @ApiProperty()
    @IsString()
    @Length(3, 30)
    desc: string;

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    listId: string;
}
