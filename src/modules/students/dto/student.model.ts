import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserModel } from '../../users/dto/user.model';
import { ClassModel } from '../../classes/dto/class.model';

@ObjectType()
export class StudentModel {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => UserModel, { nullable: true })
  user: UserModel | null;

  @Field({ nullable: true })
  rollNo: string | null;

  @Field(() => ID, { nullable: true })
  classId: string | null;

  @Field(() => ClassModel, { nullable: true })
  class: ClassModel | null;

  @Field()
  createdAt: Date;
}