import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { hash } from 'bcrypt';
import { SALT } from '../constants';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    const { email, phone, document } = createUserDto;

    const userFound = await this.usersRepository.findByEmailDocOrPhone({
      email,
      phone,
      document,
    });

    if (userFound) {
      throw new HttpException(
        { error: 'A user with this data already exists' },
        409,
      );
    }

    createUserDto.password = await hash(createUserDto.password, await SALT);
    const createdUser = await this.usersRepository.registerUser(createUserDto);
    this.logger.log(`User with id ${createdUser.id} registered`);

    return createdUser;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.getById(id);
    if (!user) {
      throw new HttpException({ error: 'User not found' }, 404);
    }
    delete user.password;
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.getById(id);

    if (!user) {
      throw new HttpException({ error: 'User not found' }, 404);
    }

    const userIdExist = await this.usersRepository.findByEmailDocOrPhone({
      email: updateUserDto.email,
      phone: updateUserDto.phone,
      document: '',
    });

    if (userIdExist && userIdExist !== id) {
      throw new HttpException(
        { error: 'This phone or email alredy in use by other user' },
        409,
      );
    }

    await this.usersRepository.update(id, updateUserDto);
    return;
  }
}
