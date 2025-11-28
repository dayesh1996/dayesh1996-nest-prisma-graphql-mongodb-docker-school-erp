import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ClassModel } from '../../classes/dto/class.model';

@ObjectType()
export class SubjectModel {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  classId: string;

  @Field(() => ClassModel, { nullable: true })
  class: ClassModel | null;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  createdAt: Date;
}

