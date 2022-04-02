import { Test, TestingModule } from '@nestjs/testing';
import { TpLinkPlugController } from './tp-link-plug.controller';

describe('TpLinkPlugController', () => {
  let controller: TpLinkPlugController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TpLinkPlugController],
    }).compile();

    controller = module.get<TpLinkPlugController>(TpLinkPlugController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
