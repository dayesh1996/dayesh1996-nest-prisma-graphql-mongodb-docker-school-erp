import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';

describe('PaymentsService', () => {
  let service: PaymentsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    payment: {
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
        PaymentsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a payment', async () => {
      const createPaymentInput: CreatePaymentInput = {
        studentId: 'student1',
        feesId: 'fees1',
        amountPaid: 5000,
      };

      const expectedPayment = {
        id: '1',
        ...createPaymentInput,
        paidAt: new Date(),
        student: null,
        fees: null,
      };

      mockPrismaService.payment.create.mockResolvedValue(expectedPayment);

      const result = await service.create(createPaymentInput);

      expect(result).toEqual(expectedPayment);
      expect(mockPrismaService.payment.create).toHaveBeenCalledWith({
        data: createPaymentInput,
        include: {
          student: { include: { user: true, class: true } },
          fees: true,
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of payments', async () => {
      const expectedPayments = [
        {
          id: '1',
          studentId: 'student1',
          feesId: 'fees1',
          amountPaid: 5000,
          paidAt: new Date(),
          student: null,
          fees: null,
        },
      ];

      mockPrismaService.payment.findMany.mockResolvedValue(expectedPayments);

      const result = await service.findAll();

      expect(result).toEqual(expectedPayments);
      expect(mockPrismaService.payment.findMany).toHaveBeenCalledWith({
        include: {
          student: { include: { user: true, class: true } },
          fees: true,
        },
        orderBy: { paidAt: 'desc' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a payment by id', async () => {
      const paymentId = '1';
      const expectedPayment = {
        id: paymentId,
        studentId: 'student1',
        feesId: 'fees1',
        amountPaid: 5000,
        paidAt: new Date(),
        student: null,
        fees: null,
      };

      mockPrismaService.payment.findUnique.mockResolvedValue(expectedPayment);

      const result = await service.findOne(paymentId);

      expect(result).toEqual(expectedPayment);
      expect(mockPrismaService.payment.findUnique).toHaveBeenCalledWith({
        where: { id: paymentId },
        include: {
          student: { include: { user: true, class: true } },
          fees: true,
        },
      });
    });
  });

  describe('findByStudentId', () => {
    it('should return payments by studentId', async () => {
      const studentId = 'student1';
      const expectedPayments = [
        {
          id: '1',
          studentId,
          feesId: 'fees1',
          amountPaid: 5000,
          paidAt: new Date(),
          student: null,
          fees: null,
        },
      ];

      mockPrismaService.payment.findMany.mockResolvedValue(expectedPayments);

      const result = await service.findByStudentId(studentId);

      expect(result).toEqual(expectedPayments);
      expect(mockPrismaService.payment.findMany).toHaveBeenCalledWith({
        where: { studentId },
        include: {
          student: { include: { user: true, class: true } },
          fees: true,
        },
        orderBy: { paidAt: 'desc' },
      });
    });
  });

  describe('update', () => {
    it('should update a payment', async () => {
      const paymentId = '1';
      const updatePaymentInput: UpdatePaymentInput = {
        amountPaid: 6000,
      };

      const expectedPayment = {
        id: paymentId,
        studentId: 'student1',
        feesId: 'fees1',
        amountPaid: 6000,
        paidAt: new Date(),
        student: null,
        fees: null,
      };

      mockPrismaService.payment.update.mockResolvedValue(expectedPayment);

      const result = await service.update(paymentId, updatePaymentInput);

      expect(result).toEqual(expectedPayment);
      expect(mockPrismaService.payment.update).toHaveBeenCalledWith({
        where: { id: paymentId },
        data: updatePaymentInput,
        include: {
          student: { include: { user: true, class: true } },
          fees: true,
        },
      });
    });
  });

  describe('remove', () => {
    it('should delete a payment', async () => {
      const paymentId = '1';
      const expectedPayment = {
        id: paymentId,
        studentId: 'student1',
        feesId: 'fees1',
        amountPaid: 5000,
        paidAt: new Date(),
        student: null,
        fees: null,
      };

      mockPrismaService.payment.delete.mockResolvedValue(expectedPayment);

      const result = await service.remove(paymentId);

      expect(result).toEqual(expectedPayment);
      expect(mockPrismaService.payment.delete).toHaveBeenCalledWith({
        where: { id: paymentId },
        include: {
          student: { include: { user: true, class: true } },
          fees: true,
        },
      });
    });
  });
});

