import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('List')
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) { }

  @UseGuards(JwtAuthGuard)
  @Post('addList')
  @ApiOperation({ summary: 'Yangi list qo‘shish' })
  @ApiResponse({ status: 201, description: 'List muvaffaqiyatli qo‘shildi.' })
  @ApiBody({ type: CreateListDto })
  create(@Body() createListDto: CreateListDto, @Req() req) {
    return this.listService.create(createListDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAllList')
  @ApiOperation({ summary: 'Barcha listlarni olish' })
  @ApiResponse({ status: 200, description: 'Barcha listlar qaytarildi.' })
  findAll(@Req() req) {
    return this.listService.findAll(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('findOneList/:id')
  @ApiOperation({ summary: 'Bitta listni olish' })
  @ApiResponse({ status: 200, description: 'List topildi.' })
  @ApiParam({ name: 'id', type: String, description: 'List ID si' })
  findOne(@Param('id') id: string) {
    return this.listService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listni qidirish' })
  @ApiResponse({ status: 200, description: 'List...' })
  @Get('search')
  async search(@Query('q') query: string) {
    return this.listService.search(query);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('updateList/:id')
  @ApiOperation({ summary: 'Listni yangilash' })
  @ApiResponse({ status: 200, description: 'List muvaffaqiyatli yangilandi.' })
  @ApiParam({ name: 'id', type: String, description: 'List ID si' })
  @ApiBody({ type: UpdateListDto })
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(id, updateListDto);
  }

  @Delete('deleteList/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listni o‘chirish' })
  @ApiResponse({ status: 200, description: 'List muvaffaqiyatli o‘chirildi.' })
  @ApiParam({ name: 'id', type: String, description: 'List ID si' })
  remove(@Param('id') id: string) {
    return this.listService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'List sahifasi' })
  @ApiResponse({ status: 201, description: 'List sahifasi ochildi.' })
  async getListById(@Param('id') id: string) {
    return this.listService.getListById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('addPassword/:id')
  async addPassword(
    @Param('id') id: string,
    @Body() dto: { name: string; password: string; desc: string }
  ) {
    return this.listService.addPassword(id, dto);
  }
}
