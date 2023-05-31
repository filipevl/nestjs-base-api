import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15d' },
    }),
    UsersModule,
  ],
  providers: [AuthService, AuthGuard, JwtService],
  controllers: [AuthController],
  exports: [AuthGuard, JwtService],
})
export class AuthModule {}
