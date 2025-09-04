import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
export class RegisterAuthDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;
}
