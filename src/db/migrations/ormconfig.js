/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const DataSource = require('typeorm');

const connectionSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '&r1OkBP91i9f',
  database: 'app',
  migrations: ['/*.ts'],
  synchronize: false,
});

// (async () => {
//   await connectionSource.initialize();
// })();

module.exports = { connectionSource };
