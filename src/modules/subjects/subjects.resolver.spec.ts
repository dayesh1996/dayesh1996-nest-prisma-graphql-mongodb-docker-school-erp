import { Test, TestingModule } from '@nestjs/testing';
import { SubjectsResolver } from './subjects.resolver';
import { SubjectsService } from './subjects.service';
import { CreateSubjectInput } from './dto/create-subject.input';
import { UpdateSubjectInput } from './dto/update-subject.input';

describe('SubjectsResolver', () => {
  let resolver: SubjectsResolver;
  let service: SubjectsService;

  const mockSubjectsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByClassId: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubjectsResolver,
        {
          provide: SubjectsService,
          useValue: mockSubjectsService,
        },
      ],
    }).compile();

    resolver = module.get<SubjectsResolver>(SubjectsResolver);
    service = module.get<SubjectsService>(SubjectsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createSubject', () => {
    it('should create a subject', async () => {
      const createSubjectInput: CreateSubjectInput = {
        classId: 'class1',
        name: 'Mathematics',
      };

      const expectedSubject = {
        id: '1',
        ...createSubjectInput,
        createdAt: new Date(),
      };

      mockSubjectsService.create.mockResolvedValue(expectedSubject);

      const result = await resolver.createSubject(createSubjectInput);

      expect(result).toEqual(expectedSubject);
      expect(service.create).toHaveBeenCalledWith(createSubjectInput);
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
        },
      ];

      mockSubjectsService.findAll.mockResolvedValue(expectedSubjects);

      const result = await resolver.findAll();

      expect(result).toEqual(expectedSubjects);
      expect(service.findAll).toHaveBeenCalled();
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
      };

      mockSubjectsService.findOne.mockResolvedValue(expectedSubject);

      const result = await resolver.findOne(subjectId);

      expect(result).toEqual(expectedSubject);
      expect(service.findOne).toHaveBeenCalledWith(subjectId);
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
        },
      ];

      mockSubjectsService.findByClassId.mockResolvedValue(expectedSubjects);

      const result = await resolver.findByClassId(classId);

      expect(result).toEqual(expectedSubjects);
      expect(service.findByClassId).toHaveBeenCalledWith(classId);
    });
  });

  describe('updateSubject', () => {
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
      };

      mockSubjectsService.update.mockResolvedValue(expectedSubject);

      const result = await resolver.updateSubject(subjectId, updateSubjectInput);

      expect(result).toEqual(expectedSubject);
      expect(service.update).toHaveBeenCalledWith(subjectId, updateSubjectInput);
    });
  });

  describe('removeSubject', () => {
    it('should delete a subject', async () => {
      const subjectId = '1';
      const expectedSubject = {
        id: subjectId,
        classId: 'class1',
        name: 'Mathematics',
        createdAt: new Date(),
      };

      mockSubjectsService.remove.mockResolvedValue(expectedSubject);

      const result = await resolver.removeSubject(subjectId);

      expect(result).toEqual(expectedSubject);
      expect(service.remove).toHaveBeenCalledWith(subjectId);
    });
  });
});

