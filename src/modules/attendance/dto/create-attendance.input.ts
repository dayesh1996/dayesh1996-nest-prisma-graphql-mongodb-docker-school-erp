import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAttendanceInput {
  @Field()
  studentId: string;

  @Field()
  date: Date;

  @Field()
  status: string; // present/absent/leave
}

