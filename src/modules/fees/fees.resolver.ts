import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { FeesService } from './fees.service';
import { FeesModel } from './dto/fees.model';
import { CreateFeesInput } from './dto/create-fees.input';
import { UpdateFeesInput } from './dto/update-fees.input';

@Resolver(() => FeesModel)
export class FeesResolver {
  constructor(private readonly feesService: FeesService) {}

  @Mutation(() => FeesModel)
  createFees(@Args('createFeesInput') createFeesInput: CreateFeesInput) {
    return this.feesService.create(createFeesInput);
  }

  @Query(() => [FeesModel], { name: 'fees' })
  findAll() {
    return this.feesService.findAll();
  }

  @Query(() => FeesModel, { name: 'fee' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.feesService.findOne(id);
  }

  @Query(() => [FeesModel], { name: 'feesByClass' })
  findByClassId(@Args('classId', { type: () => ID }) classId: string) {
    return this.feesService.findByClassId(classId);
  }

  @Mutation(() => FeesModel)
  updateFees(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateFeesInput') updateFeesInput: UpdateFeesInput,
  ) {
    return this.feesService.update(id, updateFeesInput);
  }

  @Mutation(() => FeesModel)
  removeFees(@Args('id', { type: () => ID }) id: string) {
    return this.feesService.remove(id);
  }
}
