import { Field, InputType, Float } from '@nestjs/graphql';

@InputType()
export class CreateResultInput {
  @Field()
  examId: string;

  @Field()
  studentId: string;

  @Field(() => Float)
  marks: number;

  @Field({ nullable: true })
  grade?: string;
}

