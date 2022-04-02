import { Test, TestingModule } from '@nestjs/testing';
import { TpLinkPlugService } from './tp-link-plug.service';

describe('TpLinkPlugService', () => {
  let service: TpLinkPlugService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TpLinkPlugService],
    }).compile();

    service = module.get<TpLinkPlugService>(TpLinkPlugService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
