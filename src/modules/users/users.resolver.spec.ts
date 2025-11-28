import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByEmail: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createUser', () => {
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

      mockUsersService.create.mockResolvedValue(expectedUser);

      const result = await resolver.createUser(createUserInput);

      expect(result).toEqual(expectedUser);
      expect(service.create).toHaveBeenCalledWith(createUserInput);
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
        },
      ];

      mockUsersService.findAll.mockResolvedValue(expectedUsers);

      const result = await resolver.findAll();

      expect(result).toEqual(expectedUsers);
      expect(service.findAll).toHaveBeenCalled();
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
      };

      mockUsersService.findOne.mockResolvedValue(expectedUser);

      const result = await resolver.findOne(userId);

      expect(result).toEqual(expectedUser);
      expect(service.findOne).toHaveBeenCalledWith(userId);
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
      };

      mockUsersService.findByEmail.mockResolvedValue(expectedUser);

      const result = await resolver.findByEmail(email);

      expect(result).toEqual(expectedUser);
      expect(service.findByEmail).toHaveBeenCalledWith(email);
    });
  });

  describe('updateUser', () => {
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

      mockUsersService.update.mockResolvedValue(expectedUser);

      const result = await resolver.updateUser(userId, updateUserInput);

      expect(result).toEqual(expectedUser);
      expect(service.update).toHaveBeenCalledWith(userId, updateUserInput);
    });
  });

  describe('removeUser', () => {
    it('should delete a user', async () => {
      const userId = '1';
      const expectedUser = {
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'student',
        createdAt: new Date(),
      };

      mockUsersService.remove.mockResolvedValue(expectedUser);

      const result = await resolver.removeUser(userId);

      expect(result).toEqual(expectedUser);
      expect(service.remove).toHaveBeenCalledWith(userId);
    });
  });
});
