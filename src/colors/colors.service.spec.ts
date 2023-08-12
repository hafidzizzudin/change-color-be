import { Test, TestingModule } from '@nestjs/testing';
import { ColorsService } from './colors.service';
import { Color } from './entities/color.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './../database/database.module';

describe('ColorsService', () => {
  let service: ColorsService;
  const colors = ['color_1', 'color_2', 'color_3', 'color_4', 'color_5'];
  const randomColor = 'random_color';

  afterAll(async () => {
    await service.removeAll(colors);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColorsService],
      imports: [
        TypeOrmModule.forFeature([Color]),
        ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
        DatabaseModule,
      ],
    }).compile();

    service = module.get<ColorsService>(ColorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getColor', () => {
    it('Should get undefined color', async () => {
      const color: Color = await service.findOne(randomColor);
      expect(color).toBeUndefined();
    });

    it('Successfully create color', async () => {
      colors.forEach(async (value) => {
        await service.create({ color: value });
        expect((await service.findOne(value)).color).toBe(value);
      });
    });

    it('Should get random color', async () => {
      const colors = Object.create(null);
      for (let index = 0; index < 10; index++) {
        const color = await service.getRandomColor();
        colors[color.color] = true;
      }
      console.log(Object.keys(colors));
      expect(Object.keys(colors).length).toBeGreaterThan(1);
    });
  });
});
