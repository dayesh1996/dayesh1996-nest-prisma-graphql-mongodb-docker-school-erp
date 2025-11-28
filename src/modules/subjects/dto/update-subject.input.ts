import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateSubjectInput {
  @Field({ nullable: true })
  classId?: string;

  @Field({ nullable: true })
  name?: string;
}

