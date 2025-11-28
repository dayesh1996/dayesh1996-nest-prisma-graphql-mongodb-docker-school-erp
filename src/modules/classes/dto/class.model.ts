import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ClassModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  section: string | null;

  @Field(() => Date)
  createdAt: Date;
}

