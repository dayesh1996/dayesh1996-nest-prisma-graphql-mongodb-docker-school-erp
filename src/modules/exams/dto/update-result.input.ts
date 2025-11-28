import { Field, InputType, Float } from '@nestjs/graphql';

@InputType()
export class UpdateResultInput {
  @Field({ nullable: true })
  examId?: string;

  @Field({ nullable: true })
  studentId?: string;

  @Field(() => Float, { nullable: true })
  marks?: number;

  @Field({ nullable: true })
  grade?: string;
}

