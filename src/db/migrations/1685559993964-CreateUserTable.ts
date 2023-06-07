import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1685559993964 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS  "Users"(
        id TEXT PRIMARY KEY NOT NULL,
        cep TEXT NOT NULL,
        city TEXT NOT NULL,
        birthday DATE NOT NULL,
        document VARCHAR(11) NOT NULL,
        email TEXT NOT NULL,
        name TEXT NOT NULL,
        neighborhood TEXT NOT NULL,
        number TEXT NOT NULL,
        complement TEXT NOT NULL,
        password TEXT NOT NULL,
        phone TEXT NOT NULL,
        uf TEXT NOT NULL,
        street TEXT NOT NULL,
        "userAgent" TEXT NOT NULL,
        latitude DOUBLE PRECISION NOT NULL,
        longitude DOUBLE PRECISION NOT NULL,
        "createdAt" DATE NOT NULL DEFAULT NOW(),
        "updatedAt" DATE NULL,
        "deletedAt" DATE NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Users');
  }
}
