import { Test, TestingModule } from '@nestjs/testing';
import { ExamsService } from './exams.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateExamInput } from './dto/create-exam.input';
import { UpdateExamInput } from './dto/update-exam.input';
import { CreateResultInput } from './dto/create-result.input';
import { UpdateResultInput } from './dto/update-result.input';

describe('ExamsService', () => {
  let service: ExamsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    exam: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    result: {
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
        ExamsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ExamsService>(ExamsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Exam methods', () => {
    describe('createExam', () => {
      it('should create an exam', async () => {
        const createExamInput: CreateExamInput = {
          classId: 'class1',
          name: 'Mid Term Exam',
          date: new Date('2025-06-01'),
        };

        const expectedExam = {
          id: '1',
          ...createExamInput,
          createdAt: new Date(),
          results: [],
        };

        mockPrismaService.exam.create.mockResolvedValue(expectedExam);

        const result = await service.createExam(createExamInput);

        expect(result).toEqual(expectedExam);
        expect(mockPrismaService.exam.create).toHaveBeenCalledWith({
          data: createExamInput,
          include: { results: true },
        });
      });
    });

    describe('findAllExams', () => {
      it('should return an array of exams', async () => {
        const expectedExams = [
          {
            id: '1',
            classId: 'class1',
            name: 'Mid Term Exam',
            date: new Date('2025-06-01'),
            createdAt: new Date(),
            results: [],
          },
        ];

        mockPrismaService.exam.findMany.mockResolvedValue(expectedExams);

        const result = await service.findAllExams();

        expect(result).toEqual(expectedExams);
        expect(mockPrismaService.exam.findMany).toHaveBeenCalledWith({
          include: { results: true },
          orderBy: { date: 'desc' },
        });
      });
    });

    describe('findOneExam', () => {
      it('should return an exam by id', async () => {
        const examId = '1';
        const expectedExam = {
          id: examId,
          classId: 'class1',
          name: 'Mid Term Exam',
          date: new Date('2025-06-01'),
          createdAt: new Date(),
          results: [],
        };

        mockPrismaService.exam.findUnique.mockResolvedValue(expectedExam);

        const result = await service.findOneExam(examId);

        expect(result).toEqual(expectedExam);
        expect(mockPrismaService.exam.findUnique).toHaveBeenCalledWith({
          where: { id: examId },
          include: {
            results: {
              include: {
                student: { include: { user: true } },
              },
            },
          },
        });
      });
    });

    describe('findByClassId', () => {
      it('should return exams by classId', async () => {
        const classId = 'class1';
        const expectedExams = [
          {
            id: '1',
            classId,
            name: 'Mid Term Exam',
            date: new Date('2025-06-01'),
            createdAt: new Date(),
            results: [],
          },
        ];

        mockPrismaService.exam.findMany.mockResolvedValue(expectedExams);

        const result = await service.findByClassId(classId);

        expect(result).toEqual(expectedExams);
        expect(mockPrismaService.exam.findMany).toHaveBeenCalledWith({
          where: { classId },
          include: { results: true },
          orderBy: { date: 'desc' },
        });
      });
    });

    describe('updateExam', () => {
      it('should update an exam', async () => {
        const examId = '1';
        const updateExamInput: UpdateExamInput = {
          name: 'Final Exam',
        };

        const expectedExam = {
          id: examId,
          classId: 'class1',
          name: 'Final Exam',
          date: new Date('2025-06-01'),
          createdAt: new Date(),
          results: [],
        };

        mockPrismaService.exam.update.mockResolvedValue(expectedExam);

        const result = await service.updateExam(examId, updateExamInput);

        expect(result).toEqual(expectedExam);
        expect(mockPrismaService.exam.update).toHaveBeenCalledWith({
          where: { id: examId },
          data: updateExamInput,
          include: { results: true },
        });
      });
    });

    describe('removeExam', () => {
      it('should delete an exam', async () => {
        const examId = '1';
        const expectedExam = {
          id: examId,
          classId: 'class1',
          name: 'Mid Term Exam',
          date: new Date('2025-06-01'),
          createdAt: new Date(),
        };

        mockPrismaService.exam.delete.mockResolvedValue(expectedExam);

        const result = await service.removeExam(examId);

        expect(result).toEqual(expectedExam);
        expect(mockPrismaService.exam.delete).toHaveBeenCalledWith({
          where: { id: examId },
        });
      });
    });
  });

  describe('Result methods', () => {
    describe('createResult', () => {
      it('should create a result', async () => {
        const createResultInput: CreateResultInput = {
          examId: 'exam1',
          studentId: 'student1',
          marks: 85,
          grade: 'A',
        };

        const expectedResult = {
          id: '1',
          ...createResultInput,
          createdAt: new Date(),
          exam: null,
          student: null,
        };

        mockPrismaService.result.create.mockResolvedValue(expectedResult);

        const result = await service.createResult(createResultInput);

        expect(result).toEqual(expectedResult);
        expect(mockPrismaService.result.create).toHaveBeenCalledWith({
          data: createResultInput,
          include: {
            exam: true,
            student: { include: { user: true, class: true } },
          },
        });
      });
    });

    describe('findAllResults', () => {
      it('should return an array of results', async () => {
        const expectedResults = [
          {
            id: '1',
            examId: 'exam1',
            studentId: 'student1',
            marks: 85,
            grade: 'A',
            createdAt: new Date(),
            exam: null,
            student: null,
          },
        ];

        mockPrismaService.result.findMany.mockResolvedValue(expectedResults);

        const result = await service.findAllResults();

        expect(result).toEqual(expectedResults);
        expect(mockPrismaService.result.findMany).toHaveBeenCalledWith({
          include: {
            exam: true,
            student: { include: { user: true, class: true } },
          },
          orderBy: { createdAt: 'desc' },
        });
      });
    });

    describe('findOneResult', () => {
      it('should return a result by id', async () => {
        const resultId = '1';
        const expectedResult = {
          id: resultId,
          examId: 'exam1',
          studentId: 'student1',
          marks: 85,
          grade: 'A',
          createdAt: new Date(),
          exam: null,
          student: null,
        };

        mockPrismaService.result.findUnique.mockResolvedValue(expectedResult);

        const result = await service.findOneResult(resultId);

        expect(result).toEqual(expectedResult);
        expect(mockPrismaService.result.findUnique).toHaveBeenCalledWith({
          where: { id: resultId },
          include: {
            exam: true,
            student: { include: { user: true, class: true } },
          },
        });
      });
    });

    describe('findByExamId', () => {
      it('should return results by examId', async () => {
        const examId = 'exam1';
        const expectedResults = [
          {
            id: '1',
            examId,
            studentId: 'student1',
            marks: 85,
            grade: 'A',
            createdAt: new Date(),
            exam: null,
            student: null,
          },
        ];

        mockPrismaService.result.findMany.mockResolvedValue(expectedResults);

        const result = await service.findByExamId(examId);

        expect(result).toEqual(expectedResults);
        expect(mockPrismaService.result.findMany).toHaveBeenCalledWith({
          where: { examId },
          include: {
            exam: true,
            student: { include: { user: true, class: true } },
          },
          orderBy: { marks: 'desc' },
        });
      });
    });

    describe('findByStudentId', () => {
      it('should return results by studentId', async () => {
        const studentId = 'student1';
        const expectedResults = [
          {
            id: '1',
            examId: 'exam1',
            studentId,
            marks: 85,
            grade: 'A',
            createdAt: new Date(),
            exam: null,
            student: null,
          },
        ];

        mockPrismaService.result.findMany.mockResolvedValue(expectedResults);

        const result = await service.findByStudentId(studentId);

        expect(result).toEqual(expectedResults);
        expect(mockPrismaService.result.findMany).toHaveBeenCalledWith({
          where: { studentId },
          include: {
            exam: true,
            student: { include: { user: true, class: true } },
          },
          orderBy: { createdAt: 'desc' },
        });
      });
    });

    describe('updateResult', () => {
      it('should update a result', async () => {
        const resultId = '1';
        const updateResultInput: UpdateResultInput = {
          marks: 90,
          grade: 'A+',
        };

        const expectedResult = {
          id: resultId,
          examId: 'exam1',
          studentId: 'student1',
          marks: 90,
          grade: 'A+',
          createdAt: new Date(),
          exam: null,
          student: null,
        };

        mockPrismaService.result.update.mockResolvedValue(expectedResult);

        const result = await service.updateResult(resultId, updateResultInput);

        expect(result).toEqual(expectedResult);
        expect(mockPrismaService.result.update).toHaveBeenCalledWith({
          where: { id: resultId },
          data: updateResultInput,
          include: {
            exam: true,
            student: { include: { user: true, class: true } },
          },
        });
      });
    });

    describe('removeResult', () => {
      it('should delete a result', async () => {
        const resultId = '1';
        const expectedResult = {
          id: resultId,
          examId: 'exam1',
          studentId: 'student1',
          marks: 85,
          grade: 'A',
          createdAt: new Date(),
          exam: null,
          student: null,
        };

        mockPrismaService.result.delete.mockResolvedValue(expectedResult);

        const result = await service.removeResult(resultId);

        expect(result).toEqual(expectedResult);
        expect(mockPrismaService.result.delete).toHaveBeenCalledWith({
          where: { id: resultId },
          include: {
            exam: true,
            student: { include: { user: true, class: true } },
          },
        });
      });
    });
  });
});
