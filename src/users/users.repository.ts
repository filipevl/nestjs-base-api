import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 } from 'uuid';
import { DbProvider } from '../db/db.provider';

@Injectable()
export class UsersRepository {
  private tableName = 'Users';

  constructor(private readonly dbProvider: DbProvider) {}

  async findByEmailDocOrPhone({
    email,
    phone,
    document,
  }: Partial<CreateUserDto>): Promise<string | undefined> {
    const { dbProvider, tableName } = this;
    const query = {
      name: 'findUserByEmailDocOrPhone',
      text: `SELECT id FROM "${tableName}" WHERE email = $1 OR phone = $2 OR document = $3`,
      values: [email, phone, document],
    };

    const { rows } = await dbProvider.pool.query(query);
    return rows[0]?.id;
  }

  async registerUser(
    user: CreateUserDto,
  ): Promise<Partial<CreateUserDto> | undefined> {
    const { dbProvider, tableName } = this;
    const {
      birthday,
      cep,
      city,
      complement,
      document,
      email,
      latitude,
      longitude,
      name,
      neighborhood,
      number,
      password,
      phone,
      street,
      uf,
      userAgent,
    } = user;
    const id = v4();
    const query = {
      name: 'registerUser',
      text: `INSERT INTO "${tableName}" 
    (id,cep,city,birthday,document,email,name,neighborhood,number,complement,password,phone,uf,street,"userAgent",latitude,longitude)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
    RETURNING id,cep,city,birthday,document,email,name,neighborhood,number,complement,phone,uf,street,"userAgent",latitude,longitude`,
      values: [
        id,
        cep,
        city,
        birthday,
        document,
        email,
        name,
        neighborhood,
        number,
        complement,
        password,
        phone,
        uf,
        street,
        userAgent,
        latitude,
        longitude,
      ],
    };
    const { rows } = await dbProvider.pool.query(query);
    return rows[0];
  }

  async getById(id: string): Promise<CreateUserDto> {
    const { tableName, dbProvider } = this;
    const query = {
      name: 'getUserById',
      text: `SELECT * FROM "${tableName}" WHERE id = $1`,
      values: [id],
    };
    const { rows } = await dbProvider.pool.query(query);
    return rows[0];
  }

  async update(id: string, user: Partial<CreateUserDto>) {
    const { dbProvider, tableName } = this;
    const {
      birthday,
      cep,
      city,
      complement,
      email,
      latitude,
      longitude,
      name,
      neighborhood,
      number,
      phone,
      street,
      uf,
      userAgent,
    } = user;
    const query = {
      name: 'updateUser',
      text: `UPDATE "${tableName}" 
      SET cep = $1, city = $2, birthday = $3, email = $4, name = $5, neighborhood = $6, number = $7, complement = $8, phone = $9, uf = $10, street = $11, "userAgent" = $12, latitude = $13, longitude = $14, "updatedAt" = $15 
      WHERE id = $16`,
      values: [
        cep,
        city,
        birthday,
        email,
        name,
        neighborhood,
        number,
        complement,
        phone,
        uf,
        street,
        userAgent,
        latitude,
        longitude,
        new Date().toISOString(),
        id,
      ],
    };
    await dbProvider.pool.query(query);
  }

  async updatePassword(id: string, password: string) {
    const { dbProvider, tableName } = this;

    const query = {
      name: 'updatePassword',
      text: `UPDATE "${tableName}" SET password = $1, updatedAt = $2 WHERE id = $3`,
      values: [password, new Date().toISOString(), id],
    };

    await dbProvider.pool.query(query);
  }
}
