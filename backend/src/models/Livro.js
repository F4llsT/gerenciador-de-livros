// /home/fallst/Documentos/gerenciador-de-livros/backend/src/models/Livro.js
const db = require('../config/db');

class Livro {
  static async criar(titulo, autor, ano, preco) {
    const result = await db.query(
      'INSERT INTO livros (titulo, autor, ano, preco) VALUES ($1, $2, $3, $4) RETURNING *',
      [titulo, autor, ano, preco]
    );
    return result.rows[0];
  }

  static async listar() {
    const result = await db.query('SELECT * FROM livros');
    return result.rows;
  }

  static async buscarPorId(id) {
    const result = await db.query('SELECT * FROM livros WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async atualizar(id, titulo, autor, ano, preco) {
    const result = await db.query(
      'UPDATE livros SET titulo = $1, autor = $2, ano = $3, preco = $4 WHERE id = $5 RETURNING *',
      [titulo, autor, ano, preco, id]
    );
    return result.rows[0];
  }

  static async excluir(id) {
    await db.query('DELETE FROM livros WHERE id = $1', [id]);
  }
}

module.exports = Livro;