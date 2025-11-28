import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceResolver } from './attendance.resolver';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { UpdateAttendanceInput } from './dto/update-attendance.input';

describe('AttendanceResolver', () => {
  let resolver: AttendanceResolver;
  let service: AttendanceService;

  const mockAttendanceService = {
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
        AttendanceResolver,
        {
          provide: AttendanceService,
          useValue: mockAttendanceService,
        },
      ],
    }).compile();

    resolver = module.get<AttendanceResolver>(AttendanceResolver);
    service = module.get<AttendanceService>(AttendanceService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createAttendance', () => {
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
      };

      mockAttendanceService.create.mockResolvedValue(expectedAttendance);

      const result = await resolver.createAttendance(createAttendanceInput);

      expect(result).toEqual(expectedAttendance);
      expect(service.create).toHaveBeenCalledWith(createAttendanceInput);
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
        },
      ];

      mockAttendanceService.findAll.mockResolvedValue(expectedAttendances);

      const result = await resolver.findAll();

      expect(result).toEqual(expectedAttendances);
      expect(service.findAll).toHaveBeenCalled();
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
      };

      mockAttendanceService.findOne.mockResolvedValue(expectedAttendance);

      const result = await resolver.findOne(attendanceId);

      expect(result).toEqual(expectedAttendance);
      expect(service.findOne).toHaveBeenCalledWith(attendanceId);
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
        },
      ];

      mockAttendanceService.findByStudentId.mockResolvedValue(expectedAttendances);

      const result = await resolver.findByStudentId(studentId);

      expect(result).toEqual(expectedAttendances);
      expect(service.findByStudentId).toHaveBeenCalledWith(studentId);
    });
  });

  describe('updateAttendance', () => {
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
      };

      mockAttendanceService.update.mockResolvedValue(expectedAttendance);

      const result = await resolver.updateAttendance(attendanceId, updateAttendanceInput);

      expect(result).toEqual(expectedAttendance);
      expect(service.update).toHaveBeenCalledWith(attendanceId, updateAttendanceInput);
    });
  });

  describe('removeAttendance', () => {
    it('should delete an attendance record', async () => {
      const attendanceId = '1';
      const expectedAttendance = {
        id: attendanceId,
        studentId: 'student1',
        date: new Date('2025-01-01'),
        status: 'present',
        createdAt: new Date(),
      };

      mockAttendanceService.remove.mockResolvedValue(expectedAttendance);

      const result = await resolver.removeAttendance(attendanceId);

      expect(result).toEqual(expectedAttendance);
      expect(service.remove).toHaveBeenCalledWith(attendanceId);
    });
  });
});
