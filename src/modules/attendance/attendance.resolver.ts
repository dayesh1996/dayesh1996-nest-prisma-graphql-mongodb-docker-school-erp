import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { AttendanceService } from './attendance.service';
import { AttendanceModel } from './dto/attendance.model';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { UpdateAttendanceInput } from './dto/update-attendance.input';

@Resolver(() => AttendanceModel)
export class AttendanceResolver {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Mutation(() => AttendanceModel)
  createAttendance(@Args('createAttendanceInput') createAttendanceInput: CreateAttendanceInput) {
    return this.attendanceService.create(createAttendanceInput);
  }

  @Query(() => [AttendanceModel], { name: 'attendances' })
  findAll() {
    return this.attendanceService.findAll();
  }

  @Query(() => AttendanceModel, { name: 'attendance' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.attendanceService.findOne(id);
  }

  @Query(() => [AttendanceModel], { name: 'attendancesByStudent' })
  findByStudentId(@Args('studentId', { type: () => ID }) studentId: string) {
    return this.attendanceService.findByStudentId(studentId);
  }

  @Mutation(() => AttendanceModel)
  updateAttendance(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateAttendanceInput') updateAttendanceInput: UpdateAttendanceInput,
  ) {
    return this.attendanceService.update(id, updateAttendanceInput);
  }

  @Mutation(() => AttendanceModel)
  removeAttendance(@Args('id', { type: () => ID }) id: string) {
    return this.attendanceService.remove(id);
  }
}
