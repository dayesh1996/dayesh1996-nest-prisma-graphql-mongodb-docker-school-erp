import { Test, TestingModule } from '@nestjs/testing';
import { FeesResolver } from './fees.resolver';

describe('FeesResolver', () => {
  let resolver: FeesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeesResolver],
    }).compile();

    resolver = module.get<FeesResolver>(FeesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
