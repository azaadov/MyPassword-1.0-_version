import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Foydalanuvchini ro‘yxatdan o‘tkazish' })
  @ApiResponse({ status: 201, description: 'Foydalanuvchi muvaffaqiyatli ro‘yxatdan o‘tdi' })
  @ApiResponse({ status: 400, description: 'Xatolik: noto‘g‘ri maʼlumot kiritildi' })
  register(@Body() dto: RegisterAuthDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Foydalanuvchini tizimga kirishi' })
  @ApiResponse({ status: 200, description: 'Login muvaffaqiyatli amalga oshirildi' })
  @ApiResponse({ status: 401, description: 'Xato login yoki parol' })
  login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }
}
