import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateAttendanceInput {
  @Field({ nullable: true })
  studentId?: string;

  @Field({ nullable: true })
  date?: Date;

  @Field({ nullable: true })
  status?: string;
}

