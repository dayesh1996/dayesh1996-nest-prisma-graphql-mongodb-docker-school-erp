import { Args, Resolver } from '@nestjs/graphql';
import { StudentsService } from './students.service';
import { Query } from '@nestjs/common';
import { StudentModel } from './dto/student.model';

@Resolver()
export class StudentsResolver {
    constructor(private studentService: StudentsService) { }

    // @Query(() => [Student])
    // students() {
    //     return this.studentService.findAll();
    // }

    // @Query(() => Student)
    // student(@Args('id') id: string) {
    //     return this.studentService.findOne(id);
    // }
}
