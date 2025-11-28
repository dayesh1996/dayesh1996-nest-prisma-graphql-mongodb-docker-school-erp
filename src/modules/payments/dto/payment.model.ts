import { Field, ID, ObjectType, Float } from '@nestjs/graphql';
import { StudentModel } from '../../students/dto/student.model';
import { FeesModel } from '../../fees/dto/fees.model';

@ObjectType()
export class PaymentModel {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  studentId: string;

  @Field(() => StudentModel, { nullable: true })
  student: StudentModel | null;

  @Field(() => ID, { nullable: true })
  feesId: string | null;

  @Field(() => FeesModel, { nullable: true })
  fees: FeesModel | null;

  @Field(() => Float)
  amountPaid: number;

  @Field(() => Date)
  paidAt: Date;
}

