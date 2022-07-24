import { Test, TestingModule } from '@nestjs/testing';
import { MosquittoService } from './mosquitto.service';

describe('MosquittoService', () => {
  let service: MosquittoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MosquittoService],
    }).compile();

    service = module.get<MosquittoService>(MosquittoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
