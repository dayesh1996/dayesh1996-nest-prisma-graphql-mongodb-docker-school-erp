import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateClassInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  section?: string;
}

