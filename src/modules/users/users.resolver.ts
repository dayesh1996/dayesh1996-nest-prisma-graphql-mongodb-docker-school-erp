import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserModel } from './dto/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserModel)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [UserModel], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => UserModel, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOne(id);
  }

  @Query(() => UserModel, { name: 'userByEmail', nullable: true })
  findByEmail(@Args('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Mutation(() => UserModel)
  updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => UserModel)
  removeUser(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.remove(id);
  }
}
