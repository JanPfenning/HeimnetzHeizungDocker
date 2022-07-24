import { Test, TestingModule } from '@nestjs/testing';
import { FroniusPhotovoltaikService } from './fronius-photovoltaik.service';

describe('FroniusPhotovoltaikService', () => {
  let service: FroniusPhotovoltaikService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FroniusPhotovoltaikService],
    }).compile();

    service = module.get<FroniusPhotovoltaikService>(FroniusPhotovoltaikService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
