import { Test, TestingModule } from '@nestjs/testing';
import { ExamsResolver } from './exams.resolver';

describe('ExamsResolver', () => {
  let resolver: ExamsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamsResolver],
    }).compile();

    resolver = module.get<ExamsResolver>(ExamsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
