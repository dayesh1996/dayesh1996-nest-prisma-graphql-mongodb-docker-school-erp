import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateClassInput } from './dto/create-class.input';
import { UpdateClassInput } from './dto/update-class.input';
import { ClassModel } from './dto/class.model';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  async create(createClassInput: CreateClassInput): Promise<ClassModel> {
    return this.prisma.class.create({
      data: createClassInput,
      include: {
        subjects: true,
        students: true,
      },
    });
  }

  async findAll(): Promise<ClassModel[]> {
    return this.prisma.class.findMany({
      include: {
        subjects: true,
        students: true,
      },
    });
  }

  async findOne(id: string): Promise<ClassModel | null> {
    return this.prisma.class.findUnique({
      where: { id },
      include: {
        subjects: true,
        students: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async update(id: string, updateClassInput: UpdateClassInput): Promise<ClassModel> {
    return this.prisma.class.update({
      where: { id },
      data: updateClassInput,
      include: {
        subjects: true,
        students: true,
      },
    });
  }

  async remove(id: string): Promise<ClassModel> {
    return this.prisma.class.delete({
      where: { id },
    });
  }
}

