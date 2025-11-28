import { Field, InputType, Float } from '@nestjs/graphql';

@InputType()
export class UpdatePaymentInput {
  @Field({ nullable: true })
  studentId?: string;

  @Field({ nullable: true })
  feesId?: string;

  @Field(() => Float, { nullable: true })
  amountPaid?: number;
}

