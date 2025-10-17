const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function connectToDatabase() {
  try {
    await pool.query('SELECT NOW()');
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
  }
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
  connectToDatabase
};