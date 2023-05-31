import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersRepository } from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { DbProvider } from '../db/db.provider';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let usersRepository: UsersRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        AuthGuard,
        AuthService,
        UsersRepository,
        DbProvider,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signIn', () => {
    it('should sign in user and return access token', async () => {
      const login = 'testuser';
      const password = 'testpassword';
      const userId = 'userId';
      const user = {
        id: userId,
        email: 'test@example.com',
        password: 'encripted',
      };

      jest
        .spyOn(usersRepository, 'findByEmailDocOrPhone')
        .mockResolvedValue(userId);
      jest
        .spyOn(usersRepository, 'getById')
        .mockResolvedValue(user as CreateUserDto);
      const compareSpy = jest.spyOn(bcrypt, 'compare');
      compareSpy.mockImplementation(async () => true);
      jest.spyOn(jwtService, 'sign').mockReturnValue('mockedToken');

      const result = await authService.signIn(login, password);

      expect(usersRepository.findByEmailDocOrPhone).toHaveBeenCalledWith({
        email: login,
        document: login,
        phone: login,
      });
      expect(usersRepository.getById).toHaveBeenCalledWith(userId);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, 'encripted');
      expect(typeof result).toBe('string');
    });
    it('should throw UnauthorizedException if login or password is incorrect', async () => {
      const login = 'testuser';
      const password = 'testpassword';
      const userId = 'userId';

      jest
        .spyOn(usersRepository, 'findByEmailDocOrPhone')
        .mockResolvedValue(userId);
      jest.spyOn(usersRepository, 'getById').mockResolvedValue(null);
      jest.spyOn(bcrypt, 'compare').mockImplementation();

      const result = authService.signIn(login, password);
      expect(result).rejects.toThrowError(UnauthorizedException);
      expect(usersRepository.findByEmailDocOrPhone).toHaveBeenCalledWith({
        email: login,
        document: login,
        phone: login,
      });
      // expect(usersRepository.getById).toHaveBeenCalledWith(userId);
      // expect(bcrypt.compare).not.toHaveBeenCalled();
      // expect(jwtService.sign).not.toHaveBeenCalled();
    });
  });
});
