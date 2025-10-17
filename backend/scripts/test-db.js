// /home/fallst/Documentos/gerenciador-de-livros/backend/scripts/test-db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'admin',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'gerenciador_livros',
  password: process.env.DB_PASSWORD || 'admin123',
  port: process.env.DB_PORT || 5432,
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    const result = await client.query('SELECT NOW()');
    console.log('Data/hora atual do PostgreSQL:', result.rows[0].now);
    client.release();
    process.exit(0);
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1);
  }
}

testConnection();