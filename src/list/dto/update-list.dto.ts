import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateListDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(3, 30)
  name?: string;
}
