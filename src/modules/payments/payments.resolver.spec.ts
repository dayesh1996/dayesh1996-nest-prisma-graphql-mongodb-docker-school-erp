import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsResolver } from './payments.resolver';
import { PaymentsService } from './payments.service';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';

describe('PaymentsResolver', () => {
  let resolver: PaymentsResolver;
  let service: PaymentsService;

  const mockPaymentsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByStudentId: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsResolver,
        {
          provide: PaymentsService,
          useValue: mockPaymentsService,
        },
      ],
    }).compile();

    resolver = module.get<PaymentsResolver>(PaymentsResolver);
    service = module.get<PaymentsService>(PaymentsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createPayment', () => {
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
      };

      mockPaymentsService.create.mockResolvedValue(expectedPayment);

      const result = await resolver.createPayment(createPaymentInput);

      expect(result).toEqual(expectedPayment);
      expect(service.create).toHaveBeenCalledWith(createPaymentInput);
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
        },
      ];

      mockPaymentsService.findAll.mockResolvedValue(expectedPayments);

      const result = await resolver.findAll();

      expect(result).toEqual(expectedPayments);
      expect(service.findAll).toHaveBeenCalled();
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
      };

      mockPaymentsService.findOne.mockResolvedValue(expectedPayment);

      const result = await resolver.findOne(paymentId);

      expect(result).toEqual(expectedPayment);
      expect(service.findOne).toHaveBeenCalledWith(paymentId);
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
        },
      ];

      mockPaymentsService.findByStudentId.mockResolvedValue(expectedPayments);

      const result = await resolver.findByStudentId(studentId);

      expect(result).toEqual(expectedPayments);
      expect(service.findByStudentId).toHaveBeenCalledWith(studentId);
    });
  });

  describe('updatePayment', () => {
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
      };

      mockPaymentsService.update.mockResolvedValue(expectedPayment);

      const result = await resolver.updatePayment(paymentId, updatePaymentInput);

      expect(result).toEqual(expectedPayment);
      expect(service.update).toHaveBeenCalledWith(paymentId, updatePaymentInput);
    });
  });

  describe('removePayment', () => {
    it('should delete a payment', async () => {
      const paymentId = '1';
      const expectedPayment = {
        id: paymentId,
        studentId: 'student1',
        feesId: 'fees1',
        amountPaid: 5000,
        paidAt: new Date(),
      };

      mockPaymentsService.remove.mockResolvedValue(expectedPayment);

      const result = await resolver.removePayment(paymentId);

      expect(result).toEqual(expectedPayment);
      expect(service.remove).toHaveBeenCalledWith(paymentId);
    });
  });
});
