import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {
  @Field()
  userId: string;

  @Field({ nullable: true })
  rollNo?: string;

  @Field({ nullable: true })
  classId?: string;
}

