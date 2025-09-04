import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PasswordService } from './password.service';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Passwords')
@Controller('pass')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @UseGuards(JwtAuthGuard)
  @Post('addPassword')
  @ApiOperation({ summary: 'Yangi password qo‘shish' })
  @ApiBody({ type: CreatePasswordDto })
  @ApiResponse({ status: 201, description: 'Password muvaffaqiyatli qo‘shildi.' })
  @ApiResponse({ status: 400, description: 'Xato maʼlumot kiritildi.' })
  create(@Body() createPasswordDto: CreatePasswordDto) {
    return this.passwordService.create(createPasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAllPassword')
  @ApiOperation({ summary: 'Barcha passwordlarni olish' })
  @ApiResponse({ status: 200, description: 'Passwordlar ro‘yxati muvaffaqiyatli olindi.' })
  findAll() {
    return this.passwordService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('getOnePassword/:id')
  @ApiOperation({ summary: 'Bitta passwordni olish' })
  @ApiParam({ name: 'id', type: String, description: 'Password ID' })
  @ApiResponse({ status: 200, description: 'Password topildi.' })
  @ApiResponse({ status: 404, description: 'Password topilmadi.' })
  findOne(@Param('id') id: string) {
    return this.passwordService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('updatePassword/:id')
  @ApiOperation({ summary: 'Passwordni yangilash' })
  @ApiParam({ name: 'id', type: String, description: 'Password ID' })
  @ApiBody({ type: UpdatePasswordDto })
  @ApiResponse({ status: 200, description: 'Password muvaffaqiyatli yangilandi.' })
  @ApiResponse({ status: 404, description: 'Password topilmadi.' })
  update(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.passwordService.update(id, updatePasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deletePassword/:id')
  @ApiOperation({ summary: 'Passwordni o‘chirish' })
  @ApiParam({ name: 'id', type: String, description: 'Password ID' })
  @ApiResponse({ status: 200, description: 'Password muvaffaqiyatli o‘chirildi.' })
  @ApiResponse({ status: 404, description: 'Password topilmadi.' })
  remove(@Param('id') id: string) {
    return this.passwordService.remove(id);
  }
}
