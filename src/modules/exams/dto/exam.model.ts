import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExamModel {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  classId: string;

  @Field()
  name: string;

  @Field()
  date: Date;

  @Field()
  createdAt: Date;
}

