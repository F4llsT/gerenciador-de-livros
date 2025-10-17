const db = require('../config/db');

const listarLivros = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM livros');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const criarLivro = async (req, res) => {
  try {
    const { titulo, autor, ano, preco } = req.body;
    const result = await db.query(
      'INSERT INTO livros (titulo, autor, ano, preco) VALUES ($1, $2, $3, $4) RETURNING *',
      [titulo, autor, ano, preco]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  listarLivros,
  criarLivro
};