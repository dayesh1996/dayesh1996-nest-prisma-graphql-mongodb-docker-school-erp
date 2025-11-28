import { Field, InputType, Float } from '@nestjs/graphql';

@InputType()
export class CreateFeesInput {
  @Field()
  classId: string;

  @Field(() => Float)
  amount: number;

  @Field({ nullable: true })
  dueDate?: Date;
}

