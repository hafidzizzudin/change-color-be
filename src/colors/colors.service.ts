import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { EntityManager, Repository } from 'typeorm';
import { Color } from './entities/color.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color) private colorRepository: Repository<Color>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createColorDto: CreateColorDto) {
    const data = await this.findOne(createColorDto.color);
    if (data !== undefined) {
      return data;
    }

    const color = new Color(createColorDto);
    return await this.entityManager.save(color);
  }

  async getRandomColor(): Promise<Color> {
    const count = await this.colorRepository.count();
    if (count === 0) {
      throw new HttpException('Colors not found', HttpStatus.NOT_FOUND);
    }

    let randIdx = Math.floor(Math.random() * count);

    if (randIdx === count) {
      randIdx -= 1;
    }

    const color = await this.colorRepository.query(
      `SELECT * FROM colors ORDER BY id LIMIT 1 OFFSET $1`,
      [randIdx],
    );

    return color[0];
  }

  async findOne(color: string): Promise<Color> {
    const colorEntry = await this.colorRepository.query(
      `SELECT * FROM colors WHERE color = $1 LIMIT 1`,
      [color],
    );

    return colorEntry[0];
  }

  async removeAll(colors: string[]) {
    return await this.colorRepository
      .createQueryBuilder()
      .delete()
      .from(Color)
      .where('color in (:...colors)', { colors: colors })
      .execute();
  }

  async getAll(page: number, limit: number): Promise<Color[]> {
    limit = Math.round(limit);
    const offset = Math.round((page - 1) * limit);
    return await this.colorRepository.query(
      `SELECT * FROM colors LIMIT $1 OFFSET $2`,
      [limit, offset],
    );
  }
}
