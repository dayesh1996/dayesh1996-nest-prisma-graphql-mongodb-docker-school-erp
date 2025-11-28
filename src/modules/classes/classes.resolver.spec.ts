import { Test, TestingModule } from '@nestjs/testing';
import { ClassesResolver } from './classes.resolver';
import { ClassesService } from './classes.service';
import { CreateClassInput } from './dto/create-class.input';
import { UpdateClassInput } from './dto/update-class.input';

describe('ClassesResolver', () => {
  let resolver: ClassesResolver;
  let service: ClassesService;

  const mockClassesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClassesResolver,
        {
          provide: ClassesService,
          useValue: mockClassesService,
        },
      ],
    }).compile();

    resolver = module.get<ClassesResolver>(ClassesResolver);
    service = module.get<ClassesService>(ClassesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createClass', () => {
    it('should create a class', async () => {
      const createClassInput: CreateClassInput = {
        name: 'Class 10',
        section: 'A',
      };

      const expectedClass = {
        id: '1',
        ...createClassInput,
        createdAt: new Date(),
      };

      mockClassesService.create.mockResolvedValue(expectedClass);

      const result = await resolver.createClass(createClassInput);

      expect(result).toEqual(expectedClass);
      expect(service.create).toHaveBeenCalledWith(createClassInput);
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
        },
      ];

      mockClassesService.findAll.mockResolvedValue(expectedClasses);

      const result = await resolver.findAll();

      expect(result).toEqual(expectedClasses);
      expect(service.findAll).toHaveBeenCalled();
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
      };

      mockClassesService.findOne.mockResolvedValue(expectedClass);

      const result = await resolver.findOne(classId);

      expect(result).toEqual(expectedClass);
      expect(service.findOne).toHaveBeenCalledWith(classId);
    });
  });

  describe('updateClass', () => {
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
      };

      mockClassesService.update.mockResolvedValue(expectedClass);

      const result = await resolver.updateClass(classId, updateClassInput);

      expect(result).toEqual(expectedClass);
      expect(service.update).toHaveBeenCalledWith(classId, updateClassInput);
    });
  });

  describe('removeClass', () => {
    it('should delete a class', async () => {
      const classId = '1';
      const expectedClass = {
        id: classId,
        name: 'Class 10',
        section: 'A',
        createdAt: new Date(),
      };

      mockClassesService.remove.mockResolvedValue(expectedClass);

      const result = await resolver.removeClass(classId);

      expect(result).toEqual(expectedClass);
      expect(service.remove).toHaveBeenCalledWith(classId);
    });
  });
});

