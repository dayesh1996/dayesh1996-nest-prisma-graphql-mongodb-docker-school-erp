import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateStudentInput {
  @Field({ nullable: true })
  rollNo?: string;

  @Field({ nullable: true })
  classId?: string;
}

