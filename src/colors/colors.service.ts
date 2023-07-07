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
    const color = new Color(createColorDto);
    await this.entityManager.save(color);
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

    // console.log(color);

    return color[0];
  }

  findOne(id: number) {
    return `This action returns a #${id} color`;
  }

  remove(id: number) {
    return `This action removes a #${id} color`;
  }
}
