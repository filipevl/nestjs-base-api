import 'dotenv/config';
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool();

(async () => {
  console.log({
    PGPASSWORD: process.env.PGPASSWORD,
    PGUSER: process.env.PGUSER,
    PGDATABASE: process.env.PGDATABASE,
  });
  const { rows } = await pool.query('SELECT * FROM "Users"');
  console.log(rows);
  console.log('conectado');
})();
