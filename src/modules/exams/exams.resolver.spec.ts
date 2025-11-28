import { Test, TestingModule } from '@nestjs/testing';
import { ExamsResolver } from './exams.resolver';
import { ExamsService } from './exams.service';
import { CreateExamInput } from './dto/create-exam.input';
import { UpdateExamInput } from './dto/update-exam.input';
import { CreateResultInput } from './dto/create-result.input';
import { UpdateResultInput } from './dto/update-result.input';

describe('ExamsResolver', () => {
  let resolver: ExamsResolver;
  let service: ExamsService;

  const mockExamsService = {
    createExam: jest.fn(),
    findAllExams: jest.fn(),
    findOneExam: jest.fn(),
    findByClassId: jest.fn(),
    updateExam: jest.fn(),
    removeExam: jest.fn(),
    createResult: jest.fn(),
    findAllResults: jest.fn(),
    findOneResult: jest.fn(),
    findByExamId: jest.fn(),
    findByStudentId: jest.fn(),
    updateResult: jest.fn(),
    removeResult: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExamsResolver,
        {
          provide: ExamsService,
          useValue: mockExamsService,
        },
      ],
    }).compile();

    resolver = module.get<ExamsResolver>(ExamsResolver);
    service = module.get<ExamsService>(ExamsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('Exam operations', () => {
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
        };

        mockExamsService.createExam.mockResolvedValue(expectedExam);

        const result = await resolver.createExam(createExamInput);

        expect(result).toEqual(expectedExam);
        expect(service.createExam).toHaveBeenCalledWith(createExamInput);
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
          },
        ];

        mockExamsService.findAllExams.mockResolvedValue(expectedExams);

        const result = await resolver.findAllExams();

        expect(result).toEqual(expectedExams);
        expect(service.findAllExams).toHaveBeenCalled();
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
        };

        mockExamsService.findOneExam.mockResolvedValue(expectedExam);

        const result = await resolver.findOneExam(examId);

        expect(result).toEqual(expectedExam);
        expect(service.findOneExam).toHaveBeenCalledWith(examId);
      });
    });

    describe('findExamsByClassId', () => {
      it('should return exams by classId', async () => {
        const classId = 'class1';
        const expectedExams = [
          {
            id: '1',
            classId,
            name: 'Mid Term Exam',
            date: new Date('2025-06-01'),
            createdAt: new Date(),
          },
        ];

        mockExamsService.findByClassId.mockResolvedValue(expectedExams);

        const result = await resolver.findExamsByClassId(classId);

        expect(result).toEqual(expectedExams);
        expect(service.findByClassId).toHaveBeenCalledWith(classId);
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
        };

        mockExamsService.updateExam.mockResolvedValue(expectedExam);

        const result = await resolver.updateExam(examId, updateExamInput);

        expect(result).toEqual(expectedExam);
        expect(service.updateExam).toHaveBeenCalledWith(examId, updateExamInput);
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

        mockExamsService.removeExam.mockResolvedValue(expectedExam);

        const result = await resolver.removeExam(examId);

        expect(result).toEqual(expectedExam);
        expect(service.removeExam).toHaveBeenCalledWith(examId);
      });
    });
  });

  describe('Result operations', () => {
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
        };

        mockExamsService.createResult.mockResolvedValue(expectedResult);

        const result = await resolver.createResult(createResultInput);

        expect(result).toEqual(expectedResult);
        expect(service.createResult).toHaveBeenCalledWith(createResultInput);
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
          },
        ];

        mockExamsService.findAllResults.mockResolvedValue(expectedResults);

        const result = await resolver.findAllResults();

        expect(result).toEqual(expectedResults);
        expect(service.findAllResults).toHaveBeenCalled();
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
        };

        mockExamsService.findOneResult.mockResolvedValue(expectedResult);

        const result = await resolver.findOneResult(resultId);

        expect(result).toEqual(expectedResult);
        expect(service.findOneResult).toHaveBeenCalledWith(resultId);
      });
    });

    describe('findResultsByExamId', () => {
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
          },
        ];

        mockExamsService.findByExamId.mockResolvedValue(expectedResults);

        const result = await resolver.findResultsByExamId(examId);

        expect(result).toEqual(expectedResults);
        expect(service.findByExamId).toHaveBeenCalledWith(examId);
      });
    });

    describe('findResultsByStudentId', () => {
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
          },
        ];

        mockExamsService.findByStudentId.mockResolvedValue(expectedResults);

        const result = await resolver.findResultsByStudentId(studentId);

        expect(result).toEqual(expectedResults);
        expect(service.findByStudentId).toHaveBeenCalledWith(studentId);
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
        };

        mockExamsService.updateResult.mockResolvedValue(expectedResult);

        const result = await resolver.updateResult(resultId, updateResultInput);

        expect(result).toEqual(expectedResult);
        expect(service.updateResult).toHaveBeenCalledWith(resultId, updateResultInput);
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
        };

        mockExamsService.removeResult.mockResolvedValue(expectedResult);

        const result = await resolver.removeResult(resultId);

        expect(result).toEqual(expectedResult);
        expect(service.removeResult).toHaveBeenCalledWith(resultId);
      });
    });
  });
});
