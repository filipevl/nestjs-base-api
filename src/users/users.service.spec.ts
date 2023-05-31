import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { v4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { DbProvider } from '../db/db.provider';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException } from '@nestjs/common';

const user = new CreateUserDto({
  cep: '13010141',
  city: 'Campinas',
  birthday: '2003-05-28T22:59:53.355Z',
  document: '09684663624',
  email: 'gabi@coutino.com',
  name: 'Bruno Ip',
  neighborhood: 'Centro',
  number: '776',
  complement: 'Cas',
  password: '12345678',
  phone: '+5533999399884',
  uf: 'SP',
  street: 'Avenida Benjamin Constant',
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
  latitude: 37.785834,
  longitude: -122.406417,
});

describe('UsersService', () => {
  let userService: UsersService;
  let userRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            findByEmailDocOrPhone: jest.fn(),
            registerUser: jest.fn().mockResolvedValue(user),
            getById: jest.fn(),
            update: jest.fn(),
          },
        },
        DbProvider,
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('service and repository should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('create', () => {
    it('should throw a exception because was founded a user', () => {
      jest
        .spyOn(userRepository, 'findByEmailDocOrPhone')
        .mockResolvedValue(v4());

      expect(userService.create(user)).rejects.toThrowError();
    });
    it('should create a user', async () => {
      const createdUser = await userService.create(user);

      expect(createdUser).toBe(user);
    });
  });

  describe('findOne', () => {
    const userId = 'userId';

    it('should return a user by id', async () => {
      jest.spyOn(userRepository, 'getById').mockResolvedValue(user);

      const result = await userService.findOne(userId);

      expect(userRepository.getById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });

    it('should throw a exception if user not found', async () => {
      jest.spyOn(userRepository, 'getById').mockResolvedValue(null);

      expect(userService.findOne(userId)).rejects.toThrowError();
      expect(userRepository.getById).toHaveBeenCalledWith(userId);
    });

    it('should delete password from founded user object', async () => {
      jest.spyOn(userRepository, 'getById').mockResolvedValue(user);
      const foundUser = await userService.findOne(userId);
      expect(foundUser.password).toBe(undefined);
    });
  });

  describe('update', () => {
    const userId = 'userId';

    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        email: 'newemail@example.com',
        phone: '123456789',
      };

      jest.spyOn(userRepository, 'getById').mockResolvedValue(user);
      jest
        .spyOn(userRepository, 'findByEmailDocOrPhone')
        .mockResolvedValue(null);

      await userService.update(userId, updateUserDto);

      expect(userRepository.getById).toHaveBeenCalledWith(userId);
      expect(userRepository.findByEmailDocOrPhone).toHaveBeenCalledWith({
        email: updateUserDto.email,
        phone: updateUserDto.phone,
        document: '',
      });
      expect(userRepository.update).toHaveBeenCalledWith(userId, updateUserDto);
    });

    it('should throw an error if user not found', () => {
      const updateUserDto: UpdateUserDto = {
        email: 'newemail@example.com',
        phone: '123456789',
      };

      jest.spyOn(userRepository, 'getById').mockResolvedValue(null);

      expect(userService.update(userId, updateUserDto)).rejects.toThrowError(
        HttpException,
      );

      expect(userRepository.getById).toHaveBeenCalledWith(userId);
      expect(userRepository.findByEmailDocOrPhone).not.toHaveBeenCalled();
      expect(userRepository.update).not.toHaveBeenCalled();
    });

    it('should throw an error if email or phone already in use by other user', () => {
      jest
        .spyOn(userRepository, 'getById')
        .mockResolvedValue({ ...user, id: userId });
      jest
        .spyOn(userRepository, 'findByEmailDocOrPhone')
        .mockResolvedValue('otherId');

      expect(userService.update(userId, user)).rejects.toThrowError(
        HttpException,
      );
    });
  });
});
