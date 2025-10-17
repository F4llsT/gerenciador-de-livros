const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Permite requisições do frontend React
app.use(express.json()); // Para processar JSON no body

// Array para armazenar livros (em memória)
let livros = [
  { id: 1, titulo: 'Dom Casmurro', autor: 'Machado de Assis', categoria: 'Romance' },
  { id: 2, titulo: '1984', autor: 'George Orwell', categoria: 'Ficção' },
  { id: 3, titulo: 'Clean Code', autor: 'Robert C. Martin', categoria: 'Tecnologia' }
];
let proximoId = 4;

// Rota para listar livros (GET /api/livros)
app.get('/api/livros', (req, res) => {
  const { categoria } = req.query; // Pega filtro de categoria da query string
  if (categoria) {
    const livrosFiltrados = livros.filter(livro => 
      livro.categoria.toLowerCase().includes(categoria.toLowerCase())
    );
    res.json(livrosFiltrados);
  } else {
    res.json(livros); // Retorna todos se não houver filtro
  }
});

// Rota para adicionar um livro (POST /api/livros)
app.post('/api/livros', (req, res) => {
  const { titulo, autor, categoria } = req.body;
  if (!titulo || !autor || !categoria) {
    return res.status(400).json({ message: 'Título, autor e categoria são obrigatórios' });
  }
  const novoLivro = {
    id: proximoId++,
    titulo,
    autor,
    categoria
  };
  livros.push(novoLivro);
  res.status(201).json(novoLivro); // Responde com o novo livro
});

// Rota para editar um livro (PUT /api/livros/:id)
app.put('/api/livros/:id', (req, res) => {
  const id = parseInt(req.params.id); // Pega o ID da URL
  const index = livros.findIndex(livro => livro.id === id); // Encontra o índice do livro
  if (index !== -1) {
    livros[index] = { ...livros[index], ...req.body }; // Atualiza o livro
    res.json(livros[index]); // Responde com o livro atualizado
  } else {
    res.status(404).json({ message: 'Livro não encontrado' }); // Erro se não existir
  }
});

// Rota para deletar um livro (DELETE /api/livros/:id)
app.delete('/api/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = livros.findIndex(livro => livro.id === id);
  if (index !== -1) {
    livros.splice(index, 1); // Remove o livro do array
    res.json({ message: 'Livro deletado' });
  } else {
    res.status(404).json({ message: 'Livro não encontrado' });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
