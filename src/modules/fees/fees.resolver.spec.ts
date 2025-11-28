import { Test, TestingModule } from '@nestjs/testing';
import { FeesResolver } from './fees.resolver';
import { FeesService } from './fees.service';
import { CreateFeesInput } from './dto/create-fees.input';
import { UpdateFeesInput } from './dto/update-fees.input';

describe('FeesResolver', () => {
  let resolver: FeesResolver;
  let service: FeesService;

  const mockFeesService = {
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
        FeesResolver,
        {
          provide: FeesService,
          useValue: mockFeesService,
        },
      ],
    }).compile();

    resolver = module.get<FeesResolver>(FeesResolver);
    service = module.get<FeesService>(FeesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createFees', () => {
    it('should create a fees record', async () => {
      const createFeesInput: CreateFeesInput = {
        classId: 'class1',
        amount: 5000,
        dueDate: new Date('2025-12-31'),
      };

      const expectedFees = {
        id: '1',
        ...createFeesInput,
        createdAt: new Date(),
      };

      mockFeesService.create.mockResolvedValue(expectedFees);

      const result = await resolver.createFees(createFeesInput);

      expect(result).toEqual(expectedFees);
      expect(service.create).toHaveBeenCalledWith(createFeesInput);
    });
  });

  describe('findAll', () => {
    it('should return an array of fees records', async () => {
      const expectedFees = [
        {
          id: '1',
          classId: 'class1',
          amount: 5000,
          dueDate: new Date('2025-12-31'),
          createdAt: new Date(),
        },
      ];

      mockFeesService.findAll.mockResolvedValue(expectedFees);

      const result = await resolver.findAll();

      expect(result).toEqual(expectedFees);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a fees record by id', async () => {
      const feesId = '1';
      const expectedFees = {
        id: feesId,
        classId: 'class1',
        amount: 5000,
        dueDate: new Date('2025-12-31'),
        createdAt: new Date(),
      };

      mockFeesService.findOne.mockResolvedValue(expectedFees);

      const result = await resolver.findOne(feesId);

      expect(result).toEqual(expectedFees);
      expect(service.findOne).toHaveBeenCalledWith(feesId);
    });
  });

  describe('findByClassId', () => {
    it('should return fees records by classId', async () => {
      const classId = 'class1';
      const expectedFees = [
        {
          id: '1',
          classId,
          amount: 5000,
          dueDate: new Date('2025-12-31'),
          createdAt: new Date(),
        },
      ];

      mockFeesService.findByClassId.mockResolvedValue(expectedFees);

      const result = await resolver.findByClassId(classId);

      expect(result).toEqual(expectedFees);
      expect(service.findByClassId).toHaveBeenCalledWith(classId);
    });
  });

  describe('updateFees', () => {
    it('should update a fees record', async () => {
      const feesId = '1';
      const updateFeesInput: UpdateFeesInput = {
        amount: 6000,
      };

      const expectedFees = {
        id: feesId,
        classId: 'class1',
        amount: 6000,
        dueDate: new Date('2025-12-31'),
        createdAt: new Date(),
      };

      mockFeesService.update.mockResolvedValue(expectedFees);

      const result = await resolver.updateFees(feesId, updateFeesInput);

      expect(result).toEqual(expectedFees);
      expect(service.update).toHaveBeenCalledWith(feesId, updateFeesInput);
    });
  });

  describe('removeFees', () => {
    it('should delete a fees record', async () => {
      const feesId = '1';
      const expectedFees = {
        id: feesId,
        classId: 'class1',
        amount: 5000,
        dueDate: new Date('2025-12-31'),
        createdAt: new Date(),
      };

      mockFeesService.remove.mockResolvedValue(expectedFees);

      const result = await resolver.removeFees(feesId);

      expect(result).toEqual(expectedFees);
      expect(service.remove).toHaveBeenCalledWith(feesId);
    });
  });
});
