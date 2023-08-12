import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';
import { DeleteColorDto } from './dto/delete-color.dto';

@Controller('color')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Post()
  async create(@Body() createColorDto: CreateColorDto) {
    return await this.colorsService.create(createColorDto);
  }

  @Get()
  async getRandomColor(@Query() query) {
    // directly return random color if no query exists
    if (!query) {
      return await this.colorsService.getRandomColor();
    }

    const page: number = query.page ?? 1;
    const limit: number = query.limit ?? 10;
    return await this.colorsService.getAll(page, limit);
  }

  @Get(':color')
  async findOne(@Param('color') color: string) {
    return await this.colorsService.findOne(color);
  }

  @Delete()
  async remove(@Body() data: DeleteColorDto) {
    return await this.colorsService.removeAll(data.colors);
  }
}
