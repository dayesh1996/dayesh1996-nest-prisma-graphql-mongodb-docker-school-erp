import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExamModel {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  classId: string;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  date: Date;

  @Field(() => Date)
  createdAt: Date;
}

