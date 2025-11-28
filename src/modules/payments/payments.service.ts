import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';
import { PaymentModel } from './dto/payment.model';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async create(createPaymentInput: CreatePaymentInput): Promise<PaymentModel> {
    return this.prisma.payment.create({
      data: createPaymentInput,
      include: {
        student: {
          include: {
            user: true,
            class: true,
          },
        },
        fees: true,
      },
    });
  }

  async findAll(): Promise<PaymentModel[]> {
    return this.prisma.payment.findMany({
      include: {
        student: {
          include: {
            user: true,
            class: true,
          },
        },
        fees: true,
      },
      orderBy: {
        paidAt: 'desc',
      },
    });
  }

  async findOne(id: string): Promise<PaymentModel | null> {
    return this.prisma.payment.findUnique({
      where: { id },
      include: {
        student: {
          include: {
            user: true,
            class: true,
          },
        },
        fees: true,
      },
    });
  }

  async findByStudentId(studentId: string): Promise<PaymentModel[]> {
    return this.prisma.payment.findMany({
      where: { studentId },
      include: {
        student: {
          include: {
            user: true,
            class: true,
          },
        },
        fees: true,
      },
      orderBy: {
        paidAt: 'desc',
      },
    });
  }

  async update(id: string, updatePaymentInput: UpdatePaymentInput): Promise<PaymentModel> {
    return this.prisma.payment.update({
      where: { id },
      data: updatePaymentInput,
      include: {
        student: {
          include: {
            user: true,
            class: true,
          },
        },
        fees: true,
      },
    });
  }

  async remove(id: string): Promise<PaymentModel> {
    return this.prisma.payment.delete({
      where: { id },
      include: {
        student: {
          include: {
            user: true,
            class: true,
          },
        },
        fees: true,
      },
    });
  }
}

