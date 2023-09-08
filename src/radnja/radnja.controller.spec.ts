import { Test, TestingModule } from '@nestjs/testing';
import { RadnjaController } from './radnja.controller';

describe('RadnjaController', () => {
  let controller: RadnjaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RadnjaController],
    }).compile();

    controller = module.get<RadnjaController>(RadnjaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
