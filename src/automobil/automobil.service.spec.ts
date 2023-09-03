import { Test, TestingModule } from '@nestjs/testing';
import { AutomobilService } from './automobil.service';

describe('AutomobilService', () => {
  let service: AutomobilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutomobilService],
    }).compile();

    service = module.get<AutomobilService>(AutomobilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
