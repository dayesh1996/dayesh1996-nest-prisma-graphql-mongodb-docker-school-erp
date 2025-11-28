import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSubjectInput } from './dto/create-subject.input';
import { UpdateSubjectInput } from './dto/update-subject.input';
import { SubjectModel } from './dto/subject.model';

@Injectable()
export class SubjectsService {
  constructor(private prisma: PrismaService) {}

  async create(createSubjectInput: CreateSubjectInput): Promise<SubjectModel> {
    return this.prisma.subject.create({
      data: createSubjectInput,
      include: {
        class: true,
      },
    });
  }

  async findAll(): Promise<SubjectModel[]> {
    return this.prisma.subject.findMany({
      include: {
        class: true,
      },
    });
  }

  async findOne(id: string): Promise<SubjectModel | null> {
    return this.prisma.subject.findUnique({
      where: { id },
      include: {
        class: true,
      },
    });
  }

  async findByClassId(classId: string): Promise<SubjectModel[]> {
    return this.prisma.subject.findMany({
      where: { classId },
      include: {
        class: true,
      },
    });
  }

  async update(id: string, updateSubjectInput: UpdateSubjectInput): Promise<SubjectModel> {
    return this.prisma.subject.update({
      where: { id },
      data: updateSubjectInput,
      include: {
        class: true,
      },
    });
  }

  async remove(id: string): Promise<SubjectModel> {
    return this.prisma.subject.delete({
      where: { id },
      include: {
        class: true,
      },
    });
  }
}

