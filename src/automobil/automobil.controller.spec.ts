import { Test, TestingModule } from '@nestjs/testing';
import { AutomobilController } from './automobil.controller';

describe('AutomobilController', () => {
  let controller: AutomobilController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutomobilController],
    }).compile();

    controller = module.get<AutomobilController>(AutomobilController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
