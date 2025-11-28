import { Field, ID, ObjectType, Float } from '@nestjs/graphql';

@ObjectType()
export class FeesModel {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  classId: string;

  @Field(() => Float)
  amount: number;

  @Field(() => Date, { nullable: true })
  dueDate: Date | null;

  @Field(() => Date)
  createdAt: Date;
}

