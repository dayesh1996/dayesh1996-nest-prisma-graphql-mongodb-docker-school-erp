import { Module } from '@nestjs/common';
import { ExamsResolver } from './exams.resolver';
import { ExamsService } from './exams.service';

@Module({
  providers: [ExamsResolver, ExamsService]
})
export class ExamsModule {}
