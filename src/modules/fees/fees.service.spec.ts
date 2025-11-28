import { Test, TestingModule } from '@nestjs/testing';
import { FeesService } from './fees.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFeesInput } from './dto/create-fees.input';
import { UpdateFeesInput } from './dto/update-fees.input';

describe('FeesService', () => {
  let service: FeesService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    fees: {
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
        FeesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<FeesService>(FeesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
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
        payments: [],
      };

      mockPrismaService.fees.create.mockResolvedValue(expectedFees);

      const result = await service.create(createFeesInput);

      expect(result).toEqual(expectedFees);
      expect(mockPrismaService.fees.create).toHaveBeenCalledWith({
        data: createFeesInput,
        include: { payments: true },
      });
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
          payments: [],
        },
      ];

      mockPrismaService.fees.findMany.mockResolvedValue(expectedFees);

      const result = await service.findAll();

      expect(result).toEqual(expectedFees);
      expect(mockPrismaService.fees.findMany).toHaveBeenCalledWith({
        include: { payments: true },
      });
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
        payments: [],
      };

      mockPrismaService.fees.findUnique.mockResolvedValue(expectedFees);

      const result = await service.findOne(feesId);

      expect(result).toEqual(expectedFees);
      expect(mockPrismaService.fees.findUnique).toHaveBeenCalledWith({
        where: { id: feesId },
        include: {
          payments: {
            include: {
              student: { include: { user: true } },
            },
          },
        },
      });
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
          payments: [],
        },
      ];

      mockPrismaService.fees.findMany.mockResolvedValue(expectedFees);

      const result = await service.findByClassId(classId);

      expect(result).toEqual(expectedFees);
      expect(mockPrismaService.fees.findMany).toHaveBeenCalledWith({
        where: { classId },
        include: { payments: true },
      });
    });
  });

  describe('update', () => {
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
        payments: [],
      };

      mockPrismaService.fees.update.mockResolvedValue(expectedFees);

      const result = await service.update(feesId, updateFeesInput);

      expect(result).toEqual(expectedFees);
      expect(mockPrismaService.fees.update).toHaveBeenCalledWith({
        where: { id: feesId },
        data: updateFeesInput,
        include: { payments: true },
      });
    });
  });

  describe('remove', () => {
    it('should delete a fees record', async () => {
      const feesId = '1';
      const expectedFees = {
        id: feesId,
        classId: 'class1',
        amount: 5000,
        dueDate: new Date('2025-12-31'),
        createdAt: new Date(),
      };

      mockPrismaService.fees.delete.mockResolvedValue(expectedFees);

      const result = await service.remove(feesId);

      expect(result).toEqual(expectedFees);
      expect(mockPrismaService.fees.delete).toHaveBeenCalledWith({
        where: { id: feesId },
      });
    });
  });
});
