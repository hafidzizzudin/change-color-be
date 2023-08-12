import { Test, TestingModule } from '@nestjs/testing';
import { ColorsService } from './colors.service';
import { Color } from './entities/color.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './../database/database.module';

describe('ColorsService', () => {
  let service: ColorsService;
  let module: TestingModule;
  const colors = ['color_1', 'color_2', 'color_3', 'color_4', 'color_5'];
  const randomColor = 'random_color';

  afterAll(async () => {
    // clear all data dummy
    await service.removeAll(colors);
    await module.close();
  });

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [ColorsService],
      imports: [
        TypeOrmModule.forFeature([Color]),
        ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
        DatabaseModule,
      ],
    }).compile();

    service = module.get<ColorsService>(ColorsService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Color service', () => {
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

    it('Get all created color', async () => {
      const respColors: Color[] = await service.getAll(1, colors.length);
      expect(respColors.length).toStrictEqual(colors.length);
    });

    it('Should get random color', async () => {
      const colors = Object.create(null);
      for (let index = 0; index < 10; index++) {
        const color = await service.getRandomColor();
        colors[color.color] = true;
      }
      expect(Object.keys(colors).length).toBeGreaterThan(1);
    });

    it('Remove all test colors', async () => {
      await service.removeAll(colors);
      colors.forEach(async (color: string) => {
        expect(await service.findOne(color)).toBeUndefined();
      });
    });
  });
});
