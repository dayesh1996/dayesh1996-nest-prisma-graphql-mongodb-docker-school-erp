import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';

describe('StudentsService', () => {
  let service: StudentsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    student: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a student', async () => {
      const createStudentInput: CreateStudentInput = {
        userId: 'user1',
        rollNo: '123',
        classId: 'class1',
      };

      const expectedStudent = {
        id: '1',
        ...createStudentInput,
        createdAt: new Date(),
        user: null,
        class: null,
      };

      mockPrismaService.student.create.mockResolvedValue(expectedStudent);

      const result = await service.create(createStudentInput);

      expect(result).toEqual(expectedStudent);
      expect(mockPrismaService.student.create).toHaveBeenCalledWith({
        data: createStudentInput,
        include: { user: true, class: true },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      const expectedStudents = [
        {
          id: '1',
          userId: 'user1',
          rollNo: '123',
          classId: 'class1',
          createdAt: new Date(),
          user: null,
          class: null,
        },
      ];

      mockPrismaService.student.findMany.mockResolvedValue(expectedStudents);

      const result = await service.findAll();

      expect(result).toEqual(expectedStudents);
      expect(mockPrismaService.student.findMany).toHaveBeenCalledWith({
        include: { user: true, class: true },
      });
    });
  });

  describe('findOne', () => {
    it('should return a student by id', async () => {
      const studentId = '1';
      const expectedStudent = {
        id: studentId,
        userId: 'user1',
        rollNo: '123',
        classId: 'class1',
        createdAt: new Date(),
        user: null,
        class: null,
        attendances: [],
        results: [],
        payments: [],
      };

      mockPrismaService.student.findUnique.mockResolvedValue(expectedStudent);

      const result = await service.findOne(studentId);

      expect(result).toEqual(expectedStudent);
      expect(mockPrismaService.student.findUnique).toHaveBeenCalledWith({
        where: { id: studentId },
        include: {
          user: true,
          class: true,
          attendances: true,
          results: true,
          payments: true,
        },
      });
    });
  });

  describe('findByUserId', () => {
    it('should return a student by userId', async () => {
      const userId = 'user1';
      const expectedStudent = {
        id: '1',
        userId,
        rollNo: '123',
        classId: 'class1',
        createdAt: new Date(),
        user: null,
        class: null,
      };

      mockPrismaService.student.findUnique.mockResolvedValue(expectedStudent);

      const result = await service.findByUserId(userId);

      expect(result).toEqual(expectedStudent);
      expect(mockPrismaService.student.findUnique).toHaveBeenCalledWith({
        where: { userId },
        include: { user: true, class: true },
      });
    });
  });

  describe('findByClassId', () => {
    it('should return students by classId', async () => {
      const classId = 'class1';
      const expectedStudents = [
        {
          id: '1',
          userId: 'user1',
          rollNo: '123',
          classId,
          createdAt: new Date(),
          user: null,
          class: null,
        },
      ];

      mockPrismaService.student.findMany.mockResolvedValue(expectedStudents);

      const result = await service.findByClassId(classId);

      expect(result).toEqual(expectedStudents);
      expect(mockPrismaService.student.findMany).toHaveBeenCalledWith({
        where: { classId },
        include: { user: true, class: true },
      });
    });
  });

  describe('update', () => {
    it('should update a student', async () => {
      const studentId = '1';
      const updateStudentInput: UpdateStudentInput = {
        rollNo: '456',
      };

      const expectedStudent = {
        id: studentId,
        userId: 'user1',
        rollNo: '456',
        classId: 'class1',
        createdAt: new Date(),
        user: null,
        class: null,
      };

      mockPrismaService.student.update.mockResolvedValue(expectedStudent);

      const result = await service.update(studentId, updateStudentInput);

      expect(result).toEqual(expectedStudent);
      expect(mockPrismaService.student.update).toHaveBeenCalledWith({
        where: { id: studentId },
        data: updateStudentInput,
        include: { user: true, class: true },
      });
    });
  });

  describe('remove', () => {
    it('should delete a student', async () => {
      const studentId = '1';
      const expectedStudent = {
        id: studentId,
        userId: 'user1',
        rollNo: '123',
        classId: 'class1',
        createdAt: new Date(),
        user: null,
        class: null,
      };

      mockPrismaService.student.delete.mockResolvedValue(expectedStudent);

      const result = await service.remove(studentId);

      expect(result).toEqual(expectedStudent);
      expect(mockPrismaService.student.delete).toHaveBeenCalledWith({
        where: { id: studentId },
        include: { user: true, class: true },
      });
    });
  });
});
