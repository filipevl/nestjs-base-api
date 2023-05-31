import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { jwtConstants } from './constants';
import { UsersRepository } from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(login: string, password: string): Promise<any> {
    const userId = await this.usersRepository.findByEmailDocOrPhone({
      email: login,
      document: login,
      phone: login,
    });

    if (userId) {
      const user = await this.usersRepository.getById(userId);
      if (!user) {
        throw new UnauthorizedException();
      }
      const passwordMatch = await compare(password, user.password);
      if (passwordMatch) {
        delete user.password;
        const token = this.jwtService.sign(user, {
          secret: jwtConstants.secret,
        });
        return token;
      }
    }

    throw new UnauthorizedException();
  }
}
