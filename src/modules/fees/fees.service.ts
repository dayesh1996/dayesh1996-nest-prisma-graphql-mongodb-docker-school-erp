import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFeesInput } from './dto/create-fees.input';
import { UpdateFeesInput } from './dto/update-fees.input';
import { FeesModel } from './dto/fees.model';

@Injectable()
export class FeesService {
  constructor(private prisma: PrismaService) {}

  async create(createFeesInput: CreateFeesInput): Promise<FeesModel> {
    return this.prisma.fees.create({
      data: createFeesInput,
      include: {
        payments: true,
      },
    });
  }

  async findAll(): Promise<FeesModel[]> {
    return this.prisma.fees.findMany({
      include: {
        payments: true,
      },
    });
  }

  async findOne(id: string): Promise<FeesModel | null> {
    return this.prisma.fees.findUnique({
      where: { id },
      include: {
        payments: {
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

  async findByClassId(classId: string): Promise<FeesModel[]> {
    return this.prisma.fees.findMany({
      where: { classId },
      include: {
        payments: true,
      },
    });
  }

  async update(id: string, updateFeesInput: UpdateFeesInput): Promise<FeesModel> {
    return this.prisma.fees.update({
      where: { id },
      data: updateFeesInput,
      include: {
        payments: true,
      },
    });
  }

  async remove(id: string): Promise<FeesModel> {
    return this.prisma.fees.delete({
      where: { id },
    });
  }
}
