import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UsersResolver {
  @Query(() => String)
  hello(): string {
    return 'Hello World!';
  }
}
