import { Test, TestingModule } from '@nestjs/testing';
import { ClassesService } from './classes.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateClassInput } from './dto/create-class.input';
import { UpdateClassInput } from './dto/update-class.input';

describe('ClassesService', () => {
  let service: ClassesService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    class: {
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
        ClassesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ClassesService>(ClassesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a class', async () => {
      const createClassInput: CreateClassInput = {
        name: 'Class 10',
        section: 'A',
      };

      const expectedClass = {
        id: '1',
        ...createClassInput,
        createdAt: new Date(),
        subjects: [],
        students: [],
      };

      mockPrismaService.class.create.mockResolvedValue(expectedClass);

      const result = await service.create(createClassInput);

      expect(result).toEqual(expectedClass);
      expect(mockPrismaService.class.create).toHaveBeenCalledWith({
        data: createClassInput,
        include: { subjects: true, students: true },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of classes', async () => {
      const expectedClasses = [
        {
          id: '1',
          name: 'Class 10',
          section: 'A',
          createdAt: new Date(),
          subjects: [],
          students: [],
        },
      ];

      mockPrismaService.class.findMany.mockResolvedValue(expectedClasses);

      const result = await service.findAll();

      expect(result).toEqual(expectedClasses);
      expect(mockPrismaService.class.findMany).toHaveBeenCalledWith({
        include: { subjects: true, students: true },
      });
    });
  });

  describe('findOne', () => {
    it('should return a class by id', async () => {
      const classId = '1';
      const expectedClass = {
        id: classId,
        name: 'Class 10',
        section: 'A',
        createdAt: new Date(),
        subjects: [],
        students: [],
      };

      mockPrismaService.class.findUnique.mockResolvedValue(expectedClass);

      const result = await service.findOne(classId);

      expect(result).toEqual(expectedClass);
      expect(mockPrismaService.class.findUnique).toHaveBeenCalledWith({
        where: { id: classId },
        include: {
          subjects: true,
          students: { include: { user: true } },
        },
      });
    });
  });

  describe('update', () => {
    it('should update a class', async () => {
      const classId = '1';
      const updateClassInput: UpdateClassInput = {
        name: 'Class 11',
      };

      const expectedClass = {
        id: classId,
        name: 'Class 11',
        section: 'A',
        createdAt: new Date(),
        subjects: [],
        students: [],
      };

      mockPrismaService.class.update.mockResolvedValue(expectedClass);

      const result = await service.update(classId, updateClassInput);

      expect(result).toEqual(expectedClass);
      expect(mockPrismaService.class.update).toHaveBeenCalledWith({
        where: { id: classId },
        data: updateClassInput,
        include: { subjects: true, students: true },
      });
    });
  });

  describe('remove', () => {
    it('should delete a class', async () => {
      const classId = '1';
      const expectedClass = {
        id: classId,
        name: 'Class 10',
        section: 'A',
        createdAt: new Date(),
      };

      mockPrismaService.class.delete.mockResolvedValue(expectedClass);

      const result = await service.remove(classId);

      expect(result).toEqual(expectedClass);
      expect(mockPrismaService.class.delete).toHaveBeenCalledWith({
        where: { id: classId },
      });
    });
  });
});

