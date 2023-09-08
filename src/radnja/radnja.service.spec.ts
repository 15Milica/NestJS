import { Test, TestingModule } from '@nestjs/testing';
import { RadnjaService } from './radnja.service';

describe('RadnjaService', () => {
  let service: RadnjaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RadnjaService],
    }).compile();

    service = module.get<RadnjaService>(RadnjaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
