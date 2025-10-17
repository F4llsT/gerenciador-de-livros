const db = require('../config/db');

const listarLivros = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM livros');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarLivro = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM livros WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    
    res.json(result.rows[0]);
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

const atualizarLivro = async (req, res) => {
  console.log('Recebendo requisição para atualizar livro:', {
    params: req.params,
    body: req.body
  });

  try {
    const { id } = req.params;
    let { titulo, autor, ano, preco } = req.body;
    
    console.log('Dados recebidos:', { titulo, autor, ano, preco });
    
    // Garantir que ano e preco sejam números
    ano = parseInt(ano, 10);
    preco = parseFloat(preco);
    
    console.log('Dados após conversão:', { titulo, autor, ano, preco });
    
    // Validar os dados
    if (!titulo || !autor || isNaN(ano) || isNaN(preco)) {
      const error = 'Dados inválidos. Verifique se todos os campos foram preenchidos corretamente.';
      console.error(error, { titulo, autor, ano, preco });
      return res.status(400).json({ error });
    }
    
    console.log('Executando query de atualização...');
    const result = await db.query(
      'UPDATE livros SET titulo = $1, autor = $2, ano = $3, preco = $4 WHERE id = $5 RETURNING *',
      [titulo, autor, ano, preco, id]
    );
    
    console.log('Resultado da atualização:', result.rows[0]);
    
    if (result.rows.length === 0) {
      const error = `Livro com ID ${id} não encontrado`;
      console.error(error);
      return res.status(404).json({ error });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro detalhado ao atualizar livro:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      detail: error.detail
    });
    res.status(400).json({ 
      error: `Erro ao atualizar o livro: ${error.message}` 
    });
  }
};

const excluirLivro = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM livros WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarLivros,
  buscarLivro,
  criarLivro,
  atualizarLivro,
  excluirLivro
};