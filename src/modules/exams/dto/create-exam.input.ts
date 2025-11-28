import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateExamInput {
  @Field()
  classId: string;

  @Field()
  name: string;

  @Field()
  date: Date;
}

