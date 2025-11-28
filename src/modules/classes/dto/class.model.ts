import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ClassModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  section: string | null;

  @Field()
  createdAt: Date;
}

