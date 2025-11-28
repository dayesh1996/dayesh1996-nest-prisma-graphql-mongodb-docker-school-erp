import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { StudentsService } from './students.service';
import { StudentModel } from './dto/student.model';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';

@Resolver(() => StudentModel)
export class StudentsResolver {
  constructor(private readonly studentsService: StudentsService) {}

  @Mutation(() => StudentModel)
  createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput) {
    return this.studentsService.create(createStudentInput);
  }

  @Query(() => [StudentModel], { name: 'students' })
  findAll() {
    return this.studentsService.findAll();
  }

  @Query(() => StudentModel, { name: 'student' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.studentsService.findOne(id);
  }

  @Query(() => StudentModel, { name: 'studentByUserId', nullable: true })
  findByUserId(@Args('userId', { type: () => ID }) userId: string) {
    return this.studentsService.findByUserId(userId);
  }

  @Query(() => [StudentModel], { name: 'studentsByClass' })
  findByClassId(@Args('classId', { type: () => ID }) classId: string) {
    return this.studentsService.findByClassId(classId);
  }

  @Mutation(() => StudentModel)
  updateStudent(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  ) {
    return this.studentsService.update(id, updateStudentInput);
  }

  @Mutation(() => StudentModel)
  removeStudent(@Args('id', { type: () => ID }) id: string) {
    return this.studentsService.remove(id);
  }
}
