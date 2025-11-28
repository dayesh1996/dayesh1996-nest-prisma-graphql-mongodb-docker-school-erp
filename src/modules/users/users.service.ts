import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserModel } from './dto/user.model';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput): Promise<UserModel> {
    return this.prisma.user.create({
      data: createUserInput,
    });
  }

  async findAll(): Promise<UserModel[]> {
    return this.prisma.user.findMany({
      include: {
        student: true,
      },
    });
  }

  async findOne(id: string): Promise<UserModel | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        student: true,
      },
    });
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        student: true,
      },
    });
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<UserModel> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserInput,
    });
  }

  async remove(id: string): Promise<UserModel> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
