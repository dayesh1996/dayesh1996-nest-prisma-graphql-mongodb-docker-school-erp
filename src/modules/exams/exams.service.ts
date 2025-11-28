import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateExamInput } from './dto/create-exam.input';
import { UpdateExamInput } from './dto/update-exam.input';
import { ExamModel } from './dto/exam.model';
import { CreateResultInput } from './dto/create-result.input';
import { UpdateResultInput } from './dto/update-result.input';
import { ResultModel } from './dto/result.model';

@Injectable()
export class ExamsService {
  constructor(private prisma: PrismaService) {}

  // Exam methods
  async createExam(createExamInput: CreateExamInput): Promise<ExamModel> {
    return this.prisma.exam.create({
      data: createExamInput,
      include: {
        results: true,
      },
    });
  }

  async findAllExams(): Promise<ExamModel[]> {
    return this.prisma.exam.findMany({
      include: {
        results: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async findOneExam(id: string): Promise<ExamModel | null> {
    return this.prisma.exam.findUnique({
      where: { id },
      include: {
        results: {
          include: {
            student: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
  }

  async findByClassId(classId: string): Promise<ExamModel[]> {
    return this.prisma.exam.findMany({
      where: { classId },
      include: {
        results: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async updateExam(id: string, updateExamInput: UpdateExamInput): Promise<ExamModel> {
    return this.prisma.exam.update({
      where: { id },
      data: updateExamInput,
      include: {
        results: true,
      },
    });
  }

  async removeExam(id: string): Promise<ExamModel> {
    return this.prisma.exam.delete({
      where: { id },
    });
  }

  // Result methods
  async createResult(createResultInput: CreateResultInput): Promise<ResultModel> {
    return this.prisma.result.create({
      data: createResultInput,
      include: {
        exam: true,
        student: {
          include: {
            user: true,
            class: true,
          },
        },
      },
    });
  }

  async findAllResults(): Promise<ResultModel[]> {
    return this.prisma.result.findMany({
      include: {
        exam: true,
        student: {
          include: {
            user: true,
            class: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOneResult(id: string): Promise<ResultModel | null> {
    return this.prisma.result.findUnique({
      where: { id },
      include: {
        exam: true,
        student: {
          include: {
            user: true,
            class: true,
          },
        },
      },
    });
  }

  async findByExamId(examId: string): Promise<ResultModel[]> {
    return this.prisma.result.findMany({
      where: { examId },
      include: {
        exam: true,
        student: {
          include: {
            user: true,
            class: true,
          },
        },
      },
      orderBy: {
        marks: 'desc',
      },
    });
  }

  async findByStudentId(studentId: string): Promise<ResultModel[]> {
    return this.prisma.result.findMany({
      where: { studentId },
      include: {
        exam: true,
        student: {
          include: {
            user: true,
            class: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateResult(id: string, updateResultInput: UpdateResultInput): Promise<ResultModel> {
    return this.prisma.result.update({
      where: { id },
      data: updateResultInput,
      include: {
        exam: true,
        student: {
          include: {
            user: true,
            class: true,
          },
        },
      },
    });
  }

  async removeResult(id: string): Promise<ResultModel> {
    return this.prisma.result.delete({
      where: { id },
      include: {
        exam: true,
        student: {
          include: {
            user: true,
            class: true,
          },
        },
      },
    });
  }
}
