import { Test, TestingModule } from '@nestjs/testing';
import { ColorsController } from './colors.controller';
import { ColorsService } from './colors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Color } from './entities/color.entity';
import { DatabaseModule } from './../database/database.module';

describe('ColorsController', () => {
  let controller: ColorsController;
  let module: TestingModule;
  const colors = [
    'color_ctrl_1',
    'color_ctrl_2',
    'color_ctrl_3',
    'color_ctrl_4',
    'color_ctrl_5',
  ];
  const randomColor = 'random_color';

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ColorsController],
      providers: [ColorsService],
      imports: [
        TypeOrmModule.forFeature([Color]),
        ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
        DatabaseModule,
      ],
    }).compile();

    controller = module.get<ColorsController>(ColorsController);
  });

  afterAll(async () => {
    // clear all data dummy
    await controller.remove({ colors: colors });
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get undefined color', async () => {
    const color: Color = await controller.findOne(randomColor);
    expect(color).toBeUndefined();
  });

  it('successfully create color', async () => {
    colors.forEach(async (value) => {
      await controller.create({ color: value });
      expect((await controller.findOne(value)).color).toBe(value);
    });
  });

  it('should get random color', async () => {
    const colors = Object.create(null);
    for (let index = 0; index < 10; index++) {
      const color = await controller.getRandomColor(null);
      expect(color).toBeDefined();
      colors[(color as Color).color] = true;
    }
    expect(Object.keys(colors).length).toBeGreaterThan(1);
  });

  it('should get all values', async () => {
    const respColors = await controller.getRandomColor({
      page: 1,
      limit: colors.length,
    });
    expect((respColors as Color[]).length).toStrictEqual(colors.length);
  });

  it('remove all test colors', async () => {
    await controller.remove({ colors: colors });
    colors.forEach(async (color: string) => {
      const result = await controller.findOne(color);
      expect(result).toBeUndefined();
    });
  });
});
