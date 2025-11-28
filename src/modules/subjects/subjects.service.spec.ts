import { Test, TestingModule } from '@nestjs/testing';
import { SubjectsService } from './subjects.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSubjectInput } from './dto/create-subject.input';
import { UpdateSubjectInput } from './dto/update-subject.input';

describe('SubjectsService', () => {
  let service: SubjectsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    subject: {
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
        SubjectsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<SubjectsService>(SubjectsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a subject', async () => {
      const createSubjectInput: CreateSubjectInput = {
        classId: 'class1',
        name: 'Mathematics',
      };

      const expectedSubject = {
        id: '1',
        ...createSubjectInput,
        createdAt: new Date(),
        class: null,
      };

      mockPrismaService.subject.create.mockResolvedValue(expectedSubject);

      const result = await service.create(createSubjectInput);

      expect(result).toEqual(expectedSubject);
      expect(mockPrismaService.subject.create).toHaveBeenCalledWith({
        data: createSubjectInput,
        include: { class: true },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of subjects', async () => {
      const expectedSubjects = [
        {
          id: '1',
          classId: 'class1',
          name: 'Mathematics',
          createdAt: new Date(),
          class: null,
        },
      ];

      mockPrismaService.subject.findMany.mockResolvedValue(expectedSubjects);

      const result = await service.findAll();

      expect(result).toEqual(expectedSubjects);
      expect(mockPrismaService.subject.findMany).toHaveBeenCalledWith({
        include: { class: true },
      });
    });
  });

  describe('findOne', () => {
    it('should return a subject by id', async () => {
      const subjectId = '1';
      const expectedSubject = {
        id: subjectId,
        classId: 'class1',
        name: 'Mathematics',
        createdAt: new Date(),
        class: null,
      };

      mockPrismaService.subject.findUnique.mockResolvedValue(expectedSubject);

      const result = await service.findOne(subjectId);

      expect(result).toEqual(expectedSubject);
      expect(mockPrismaService.subject.findUnique).toHaveBeenCalledWith({
        where: { id: subjectId },
        include: { class: true },
      });
    });
  });

  describe('findByClassId', () => {
    it('should return subjects by classId', async () => {
      const classId = 'class1';
      const expectedSubjects = [
        {
          id: '1',
          classId,
          name: 'Mathematics',
          createdAt: new Date(),
          class: null,
        },
      ];

      mockPrismaService.subject.findMany.mockResolvedValue(expectedSubjects);

      const result = await service.findByClassId(classId);

      expect(result).toEqual(expectedSubjects);
      expect(mockPrismaService.subject.findMany).toHaveBeenCalledWith({
        where: { classId },
        include: { class: true },
      });
    });
  });

  describe('update', () => {
    it('should update a subject', async () => {
      const subjectId = '1';
      const updateSubjectInput: UpdateSubjectInput = {
        name: 'Advanced Mathematics',
      };

      const expectedSubject = {
        id: subjectId,
        classId: 'class1',
        name: 'Advanced Mathematics',
        createdAt: new Date(),
        class: null,
      };

      mockPrismaService.subject.update.mockResolvedValue(expectedSubject);

      const result = await service.update(subjectId, updateSubjectInput);

      expect(result).toEqual(expectedSubject);
      expect(mockPrismaService.subject.update).toHaveBeenCalledWith({
        where: { id: subjectId },
        data: updateSubjectInput,
        include: { class: true },
      });
    });
  });

  describe('remove', () => {
    it('should delete a subject', async () => {
      const subjectId = '1';
      const expectedSubject = {
        id: subjectId,
        classId: 'class1',
        name: 'Mathematics',
        createdAt: new Date(),
        class: null,
      };

      mockPrismaService.subject.delete.mockResolvedValue(expectedSubject);

      const result = await service.remove(subjectId);

      expect(result).toEqual(expectedSubject);
      expect(mockPrismaService.subject.delete).toHaveBeenCalledWith({
        where: { id: subjectId },
        include: { class: true },
      });
    });
  });
});

