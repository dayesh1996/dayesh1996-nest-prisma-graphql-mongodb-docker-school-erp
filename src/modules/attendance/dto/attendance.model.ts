import { Field, ID, ObjectType } from '@nestjs/graphql';
import { StudentModel } from '../../students/dto/student.model';

@ObjectType()
export class AttendanceModel {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  studentId: string;

  @Field(() => StudentModel, { nullable: true })
  student: StudentModel | null;

  @Field(() => Date)
  date: Date;

  @Field(() => String)
  status: string; // present/absent/leave

  @Field(() => Date)
  createdAt: Date;
}

