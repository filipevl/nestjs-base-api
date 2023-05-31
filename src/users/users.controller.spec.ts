import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

const user = new CreateUserDto({
  cep: 'string',
  city: 'string',
  birthday: 'string',
  document: 'string',
  email: 'string',
  name: 'string',
  neighborhood: 'string',
  number: 'string',
  complement: 'string',
  password: 'string',
  phone: 'string',
  uf: 'string',
  street: 'string',
  userAgent: 'string',
  latitude: 1,
  longitude: 1,
});

describe('UsersController', () => {
  let userController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(user),
            findOne: jest.fn().mockResolvedValue(user),
            update: jest.fn().mockResolvedValue(user),
          },
        },
        JwtService,
      ],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('controller and service should be defined', () => {
    expect(userController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('must create a user', async () => {
      const result = await userController.create(user);
      expect(result).toBe(user);
      expect(usersService.create).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('must find a user by id', async () => {
      const result = await userController.findOne({ user: { id: 'some_id' } });
      expect(result).toBe(user);
      expect(usersService.findOne).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('must update a user', async () => {
      const result = await userController.update(user, {
        user: { id: 'some_id' },
      });
      expect(result).toBe(user);
      expect(usersService.update).toHaveBeenCalled();
    });
  });
});
