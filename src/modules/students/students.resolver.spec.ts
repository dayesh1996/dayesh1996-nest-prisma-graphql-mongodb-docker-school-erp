import { Test, TestingModule } from '@nestjs/testing';
import { StudentsResolver } from './students.resolver';
import { StudentsService } from './students.service';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';

describe('StudentsResolver', () => {
  let resolver: StudentsResolver;
  let service: StudentsService;

  const mockStudentsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByUserId: jest.fn(),
    findByClassId: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsResolver,
        {
          provide: StudentsService,
          useValue: mockStudentsService,
        },
      ],
    }).compile();

    resolver = module.get<StudentsResolver>(StudentsResolver);
    service = module.get<StudentsService>(StudentsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createStudent', () => {
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

      mockStudentsService.create.mockResolvedValue(expectedStudent);

      const result = await resolver.createStudent(createStudentInput);

      expect(result).toEqual(expectedStudent);
      expect(service.create).toHaveBeenCalledWith(createStudentInput);
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
        },
      ];

      mockStudentsService.findAll.mockResolvedValue(expectedStudents);

      const result = await resolver.findAll();

      expect(result).toEqual(expectedStudents);
      expect(service.findAll).toHaveBeenCalled();
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
      };

      mockStudentsService.findOne.mockResolvedValue(expectedStudent);

      const result = await resolver.findOne(studentId);

      expect(result).toEqual(expectedStudent);
      expect(service.findOne).toHaveBeenCalledWith(studentId);
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
      };

      mockStudentsService.findByUserId.mockResolvedValue(expectedStudent);

      const result = await resolver.findByUserId(userId);

      expect(result).toEqual(expectedStudent);
      expect(service.findByUserId).toHaveBeenCalledWith(userId);
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
        },
      ];

      mockStudentsService.findByClassId.mockResolvedValue(expectedStudents);

      const result = await resolver.findByClassId(classId);

      expect(result).toEqual(expectedStudents);
      expect(service.findByClassId).toHaveBeenCalledWith(classId);
    });
  });

  describe('updateStudent', () => {
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
      };

      mockStudentsService.update.mockResolvedValue(expectedStudent);

      const result = await resolver.updateStudent(studentId, updateStudentInput);

      expect(result).toEqual(expectedStudent);
      expect(service.update).toHaveBeenCalledWith(studentId, updateStudentInput);
    });
  });

  describe('removeStudent', () => {
    it('should delete a student', async () => {
      const studentId = '1';
      const expectedStudent = {
        id: studentId,
        userId: 'user1',
        rollNo: '123',
        classId: 'class1',
        createdAt: new Date(),
      };

      mockStudentsService.remove.mockResolvedValue(expectedStudent);

      const result = await resolver.removeStudent(studentId);

      expect(result).toEqual(expectedStudent);
      expect(service.remove).toHaveBeenCalledWith(studentId);
    });
  });
});
