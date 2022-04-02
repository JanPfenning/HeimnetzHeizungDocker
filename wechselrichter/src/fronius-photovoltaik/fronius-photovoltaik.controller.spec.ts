import { Test, TestingModule } from '@nestjs/testing';
import { FroniusPhotovoltaikController } from './fronius-photovoltaik.controller';

describe('FroniusPhotovoltaikController', () => {
  let controller: FroniusPhotovoltaikController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FroniusPhotovoltaikController],
    }).compile();

    controller = module.get<FroniusPhotovoltaikController>(FroniusPhotovoltaikController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
