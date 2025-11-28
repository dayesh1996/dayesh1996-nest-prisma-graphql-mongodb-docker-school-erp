import { Field, ID, ObjectType, Float } from '@nestjs/graphql';
import { ExamModel } from './exam.model';
import { StudentModel } from '../../students/dto/student.model';

@ObjectType()
export class ResultModel {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  examId: string;

  @Field(() => ExamModel, { nullable: true })
  exam: ExamModel | null;

  @Field(() => ID)
  studentId: string;

  @Field(() => StudentModel, { nullable: true })
  student: StudentModel | null;

  @Field(() => Float)
  marks: number;

  @Field(() => String, { nullable: true })
  grade: string | null;

  @Field(() => Date)
  createdAt: Date;
}

