import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { StudentModel } from './dto/student.model';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(createStudentInput: CreateStudentInput): Promise<StudentModel> {
    return this.prisma.student.create({
      data: createStudentInput,
      include: {
        user: true,
        class: true,
      },
    });
  }

  async findAll(): Promise<StudentModel[]> {
    return this.prisma.student.findMany({
      include: {
        user: true,
        class: true,
      },
    });
  }

  async findOne(id: string): Promise<StudentModel | null> {
    return this.prisma.student.findUnique({
      where: { id },
      include: {
        user: true,
        class: true,
        attendances: true,
        results: true,
        payments: true,
      },
    });
  }

  async findByUserId(userId: string): Promise<StudentModel | null> {
    return this.prisma.student.findUnique({
      where: { userId },
      include: {
        user: true,
        class: true,
      },
    });
  }

  async findByClassId(classId: string): Promise<StudentModel[]> {
    return this.prisma.student.findMany({
      where: { classId },
      include: {
        user: true,
        class: true,
      },
    });
  }

  async update(id: string, updateStudentInput: UpdateStudentInput): Promise<StudentModel> {
    return this.prisma.student.update({
      where: { id },
      data: updateStudentInput,
      include: {
        user: true,
        class: true,
      },
    });
  }

  async remove(id: string): Promise<StudentModel> {
    return this.prisma.student.delete({
      where: { id },
      include: {
        user: true,
        class: true,
      },
    });
  }
}
