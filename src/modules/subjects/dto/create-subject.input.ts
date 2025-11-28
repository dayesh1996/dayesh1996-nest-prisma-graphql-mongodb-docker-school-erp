import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSubjectInput {
  @Field()
  classId: string;

  @Field()
  name: string;
}

