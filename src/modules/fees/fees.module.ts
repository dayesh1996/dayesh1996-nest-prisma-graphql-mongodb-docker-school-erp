import { Module } from '@nestjs/common';
import { FeesResolver } from './fees.resolver';
import { FeesService } from './fees.service';

@Module({
  providers: [FeesResolver, FeesService]
})
export class FeesModule {}
