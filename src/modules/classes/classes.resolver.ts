import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { ClassesService } from './classes.service';
import { ClassModel } from './dto/class.model';
import { CreateClassInput } from './dto/create-class.input';
import { UpdateClassInput } from './dto/update-class.input';

@Resolver(() => ClassModel)
export class ClassesResolver {
  constructor(private readonly classesService: ClassesService) {}

  @Mutation(() => ClassModel)
  createClass(@Args('createClassInput') createClassInput: CreateClassInput) {
    return this.classesService.create(createClassInput);
  }

  @Query(() => [ClassModel], { name: 'classes' })
  findAll() {
    return this.classesService.findAll();
  }

  @Query(() => ClassModel, { name: 'class' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.classesService.findOne(id);
  }

  @Mutation(() => ClassModel)
  updateClass(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateClassInput') updateClassInput: UpdateClassInput,
  ) {
    return this.classesService.update(id, updateClassInput);
  }

  @Mutation(() => ClassModel)
  removeClass(@Args('id', { type: () => ID }) id: string) {
    return this.classesService.remove(id);
  }
}

