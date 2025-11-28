import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { SubjectsService } from './subjects.service';
import { SubjectModel } from './dto/subject.model';
import { CreateSubjectInput } from './dto/create-subject.input';
import { UpdateSubjectInput } from './dto/update-subject.input';

@Resolver(() => SubjectModel)
export class SubjectsResolver {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Mutation(() => SubjectModel)
  createSubject(@Args('createSubjectInput') createSubjectInput: CreateSubjectInput) {
    return this.subjectsService.create(createSubjectInput);
  }

  @Query(() => [SubjectModel], { name: 'subjects' })
  findAll() {
    return this.subjectsService.findAll();
  }

  @Query(() => SubjectModel, { name: 'subject' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.subjectsService.findOne(id);
  }

  @Query(() => [SubjectModel], { name: 'subjectsByClass' })
  findByClassId(@Args('classId', { type: () => ID }) classId: string) {
    return this.subjectsService.findByClassId(classId);
  }

  @Mutation(() => SubjectModel)
  updateSubject(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateSubjectInput') updateSubjectInput: UpdateSubjectInput,
  ) {
    return this.subjectsService.update(id, updateSubjectInput);
  }

  @Mutation(() => SubjectModel)
  removeSubject(@Args('id', { type: () => ID }) id: string) {
    return this.subjectsService.remove(id);
  }
}

