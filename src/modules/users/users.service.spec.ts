import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    user: {
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
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserInput: CreateUserInput = {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'student',
      };

      const expectedUser = {
        id: '1',
        ...createUserInput,
        createdAt: new Date(),
      };

      mockPrismaService.user.create.mockResolvedValue(expectedUser);

      const result = await service.create(createUserInput);

      expect(result).toEqual(expectedUser);
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: createUserInput,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const expectedUsers = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'student',
          createdAt: new Date(),
          student: null,
        },
        {
          id: '2',
          name: 'Jane Doe',
          email: 'jane@example.com',
          role: 'teacher',
          createdAt: new Date(),
          student: null,
        },
      ];

      mockPrismaService.user.findMany.mockResolvedValue(expectedUsers);

      const result = await service.findAll();

      expect(result).toEqual(expectedUsers);
      expect(mockPrismaService.user.findMany).toHaveBeenCalledWith({
        include: { student: true },
      });
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const userId = '1';
      const expectedUser = {
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'student',
        createdAt: new Date(),
        student: null,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(expectedUser);

      const result = await service.findOne(userId);

      expect(result).toEqual(expectedUser);
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        include: { student: true },
      });
    });

    it('should return null if user not found', async () => {
      const userId = '999';

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      const result = await service.findOne(userId);

      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const email = 'john@example.com';
      const expectedUser = {
        id: '1',
        name: 'John Doe',
        email,
        role: 'student',
        createdAt: new Date(),
        student: null,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(expectedUser);

      const result = await service.findByEmail(email);

      expect(result).toEqual(expectedUser);
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email },
        include: { student: true },
      });
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userId = '1';
      const updateUserInput: UpdateUserInput = {
        name: 'John Updated',
      };

      const expectedUser = {
        id: userId,
        name: 'John Updated',
        email: 'john@example.com',
        role: 'student',
        createdAt: new Date(),
      };

      mockPrismaService.user.update.mockResolvedValue(expectedUser);

      const result = await service.update(userId, updateUserInput);

      expect(result).toEqual(expectedUser);
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: updateUserInput,
      });
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const userId = '1';
      const expectedUser = {
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'student',
        createdAt: new Date(),
      };

      mockPrismaService.user.delete.mockResolvedValue(expectedUser);

      const result = await service.remove(userId);

      expect(result).toEqual(expectedUser);
      expect(mockPrismaService.user.delete).toHaveBeenCalledWith({
        where: { id: userId },
      });
    });
  });
});
