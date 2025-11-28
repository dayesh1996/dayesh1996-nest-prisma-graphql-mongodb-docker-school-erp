import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { ExamsService } from './exams.service';
import { ExamModel } from './dto/exam.model';
import { CreateExamInput } from './dto/create-exam.input';
import { UpdateExamInput } from './dto/update-exam.input';
import { ResultModel } from './dto/result.model';
import { CreateResultInput } from './dto/create-result.input';
import { UpdateResultInput } from './dto/update-result.input';

@Resolver(() => ExamModel)
export class ExamsResolver {
  constructor(private readonly examsService: ExamsService) {}

  // Exam mutations and queries
  @Mutation(() => ExamModel)
  createExam(@Args('createExamInput') createExamInput: CreateExamInput) {
    return this.examsService.createExam(createExamInput);
  }

  @Query(() => [ExamModel], { name: 'exams' })
  findAllExams() {
    return this.examsService.findAllExams();
  }

  @Query(() => ExamModel, { name: 'exam' })
  findOneExam(@Args('id', { type: () => ID }) id: string) {
    return this.examsService.findOneExam(id);
  }

  @Query(() => [ExamModel], { name: 'examsByClass' })
  findExamsByClassId(@Args('classId', { type: () => ID }) classId: string) {
    return this.examsService.findByClassId(classId);
  }

  @Mutation(() => ExamModel)
  updateExam(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateExamInput') updateExamInput: UpdateExamInput,
  ) {
    return this.examsService.updateExam(id, updateExamInput);
  }

  @Mutation(() => ExamModel)
  removeExam(@Args('id', { type: () => ID }) id: string) {
    return this.examsService.removeExam(id);
  }

  // Result mutations and queries
  @Mutation(() => ResultModel)
  createResult(@Args('createResultInput') createResultInput: CreateResultInput) {
    return this.examsService.createResult(createResultInput);
  }

  @Query(() => [ResultModel], { name: 'results' })
  findAllResults() {
    return this.examsService.findAllResults();
  }

  @Query(() => ResultModel, { name: 'result' })
  findOneResult(@Args('id', { type: () => ID }) id: string) {
    return this.examsService.findOneResult(id);
  }

  @Query(() => [ResultModel], { name: 'resultsByExam' })
  findResultsByExamId(@Args('examId', { type: () => ID }) examId: string) {
    return this.examsService.findByExamId(examId);
  }

  @Query(() => [ResultModel], { name: 'resultsByStudent' })
  findResultsByStudentId(@Args('studentId', { type: () => ID }) studentId: string) {
    return this.examsService.findByStudentId(studentId);
  }

  @Mutation(() => ResultModel)
  updateResult(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateResultInput') updateResultInput: UpdateResultInput,
  ) {
    return this.examsService.updateResult(id, updateResultInput);
  }

  @Mutation(() => ResultModel)
  removeResult(@Args('id', { type: () => ID }) id: string) {
    return this.examsService.removeResult(id);
  }
}
