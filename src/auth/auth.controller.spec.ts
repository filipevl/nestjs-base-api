import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from '../users/users.repository';
import { AuthGuard } from './auth.guard';
import { DbProvider } from '../db/db.provider';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersRepository,
        AuthGuard,
        DbProvider,
        JwtService,
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('auth controller and service must be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should return the result of authService.signIn', () => {
      const signInResult = 'token';

      jest.spyOn(authService, 'signIn').mockResolvedValue(signInResult);

      const body = { login: 'testuser', password: 'testpassword' };
      const req = { body };
      const result = authController.login(req);

      expect(authService.signIn).toHaveBeenCalledWith(
        body.login,
        body.password,
      );
      expect(result).resolves.toBe(signInResult);
    });
  });

  describe('getProfile', () => {
    it('should return the user from the request', () => {
      const user = { id: 'userId', username: 'testuser' };
      const req = { user };

      const result = authController.getProfile(req);

      expect(result).toBe(user);
    });
  });
});
