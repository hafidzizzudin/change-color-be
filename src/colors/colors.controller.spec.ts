import { Test, TestingModule } from '@nestjs/testing';
import { ColorsController } from './colors.controller';
import { ColorsService } from './colors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Color } from './entities/color.entity';
import { DatabaseModule } from './../database/database.module';

describe('ColorsController', () => {
  let controller: ColorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
