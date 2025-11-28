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

  @Field()
  name: string;

  @Field()
  createdAt: Date;
}

