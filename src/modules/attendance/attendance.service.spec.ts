import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceService } from './attendance.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { UpdateAttendanceInput } from './dto/update-attendance.input';

describe('AttendanceService', () => {
  let service: AttendanceService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    attendance: {
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
        AttendanceService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AttendanceService>(AttendanceService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an attendance record', async () => {
      const createAttendanceInput: CreateAttendanceInput = {
        studentId: 'student1',
        date: new Date('2025-01-01'),
        status: 'present',
      };

      const expectedAttendance = {
        id: '1',
        ...createAttendanceInput,
        createdAt: new Date(),
        student: null,
      };

      mockPrismaService.attendance.create.mockResolvedValue(expectedAttendance);

      const result = await service.create(createAttendanceInput);

      expect(result).toEqual(expectedAttendance);
      expect(mockPrismaService.attendance.create).toHaveBeenCalledWith({
        data: createAttendanceInput,
        include: {
          student: { include: { user: true, class: true } },
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of attendance records', async () => {
      const expectedAttendances = [
        {
          id: '1',
          studentId: 'student1',
          date: new Date('2025-01-01'),
          status: 'present',
          createdAt: new Date(),
          student: null,
        },
      ];

      mockPrismaService.attendance.findMany.mockResolvedValue(expectedAttendances);

      const result = await service.findAll();

      expect(result).toEqual(expectedAttendances);
      expect(mockPrismaService.attendance.findMany).toHaveBeenCalledWith({
        include: {
          student: { include: { user: true, class: true } },
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return an attendance record by id', async () => {
      const attendanceId = '1';
      const expectedAttendance = {
        id: attendanceId,
        studentId: 'student1',
        date: new Date('2025-01-01'),
        status: 'present',
        createdAt: new Date(),
        student: null,
      };

      mockPrismaService.attendance.findUnique.mockResolvedValue(expectedAttendance);

      const result = await service.findOne(attendanceId);

      expect(result).toEqual(expectedAttendance);
      expect(mockPrismaService.attendance.findUnique).toHaveBeenCalledWith({
        where: { id: attendanceId },
        include: {
          student: { include: { user: true, class: true } },
        },
      });
    });
  });

  describe('findByStudentId', () => {
    it('should return attendance records by studentId', async () => {
      const studentId = 'student1';
      const expectedAttendances = [
        {
          id: '1',
          studentId,
          date: new Date('2025-01-01'),
          status: 'present',
          createdAt: new Date(),
          student: null,
        },
      ];

      mockPrismaService.attendance.findMany.mockResolvedValue(expectedAttendances);

      const result = await service.findByStudentId(studentId);

      expect(result).toEqual(expectedAttendances);
      expect(mockPrismaService.attendance.findMany).toHaveBeenCalledWith({
        where: { studentId },
        include: {
          student: { include: { user: true, class: true } },
        },
        orderBy: { date: 'desc' },
      });
    });
  });

  describe('update', () => {
    it('should update an attendance record', async () => {
      const attendanceId = '1';
      const updateAttendanceInput: UpdateAttendanceInput = {
        status: 'absent',
      };

      const expectedAttendance = {
        id: attendanceId,
        studentId: 'student1',
        date: new Date('2025-01-01'),
        status: 'absent',
        createdAt: new Date(),
        student: null,
      };

      mockPrismaService.attendance.update.mockResolvedValue(expectedAttendance);

      const result = await service.update(attendanceId, updateAttendanceInput);

      expect(result).toEqual(expectedAttendance);
      expect(mockPrismaService.attendance.update).toHaveBeenCalledWith({
        where: { id: attendanceId },
        data: updateAttendanceInput,
        include: {
          student: { include: { user: true, class: true } },
        },
      });
    });
  });

  describe('remove', () => {
    it('should delete an attendance record', async () => {
      const attendanceId = '1';
      const expectedAttendance = {
        id: attendanceId,
        studentId: 'student1',
        date: new Date('2025-01-01'),
        status: 'present',
        createdAt: new Date(),
        student: null,
      };

      mockPrismaService.attendance.delete.mockResolvedValue(expectedAttendance);

      const result = await service.remove(attendanceId);

      expect(result).toEqual(expectedAttendance);
      expect(mockPrismaService.attendance.delete).toHaveBeenCalledWith({
        where: { id: attendanceId },
        include: {
          student: { include: { user: true, class: true } },
        },
      });
    });
  });
});
