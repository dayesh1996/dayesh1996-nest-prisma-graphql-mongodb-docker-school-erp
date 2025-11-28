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

  @Field()
  date: Date;

  @Field()
  status: string; // present/absent/leave

  @Field()
  createdAt: Date;
}

