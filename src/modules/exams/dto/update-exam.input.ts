import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateExamInput {
  @Field({ nullable: true })
  classId?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  date?: Date;
}

