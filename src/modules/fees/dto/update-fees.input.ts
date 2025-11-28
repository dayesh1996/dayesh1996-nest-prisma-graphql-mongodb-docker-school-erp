import { Field, InputType, Float } from '@nestjs/graphql';

@InputType()
export class UpdateFeesInput {
  @Field({ nullable: true })
  classId?: string;

  @Field(() => Float, { nullable: true })
  amount?: number;

  @Field({ nullable: true })
  dueDate?: Date;
}

