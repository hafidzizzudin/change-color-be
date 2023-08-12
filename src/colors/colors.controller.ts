import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';

@Controller('color')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Post()
  async create(@Body() createColorDto: CreateColorDto) {
    return await this.colorsService.create(createColorDto);
  }

  @Get()
  async getRandomColor() {
    return await this.colorsService.getRandomColor();
  }

  @Get(':color')
  async findOne(@Param('color') color: string) {
    return await this.colorsService.findOne(color);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colorsService.remove(+id);
  }
}
