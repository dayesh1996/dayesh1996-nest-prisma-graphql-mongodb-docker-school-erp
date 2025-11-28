import { Field, InputType, Float } from '@nestjs/graphql';

@InputType()
export class CreatePaymentInput {
  @Field()
  studentId: string;

  @Field({ nullable: true })
  feesId?: string;

  @Field(() => Float)
  amountPaid: number;
}

