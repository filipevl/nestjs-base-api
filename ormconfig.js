// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrations: ['dist/db/migrations/*.js'], // ajuste o caminho das migrações de acordo com a estrutura do seu projeto
  cli: {
    migrationsDir: 'src/db/migrations', // ajuste o caminho do diretório de migrações de acordo com a estrutura do seu projeto
  },
};
