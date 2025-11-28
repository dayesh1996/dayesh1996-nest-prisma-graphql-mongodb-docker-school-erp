import { Module } from '@nestjs/common';
import { AttendanceResolver } from './attendance.resolver';
import { AttendanceService } from './attendance.service';

@Module({
  providers: [AttendanceResolver, AttendanceService]
})
export class AttendanceModule {}
