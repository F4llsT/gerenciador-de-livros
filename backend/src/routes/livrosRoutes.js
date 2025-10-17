const express = require('express');
const router = express.Router();
const { 
  listarLivros,
  buscarLivro,
  criarLivro, 
  atualizarLivro, 
  excluirLivro 
} = require('../controllers/livrosController');

// Rotas
router.get('/', listarLivros);
router.get('/:id', buscarLivro);
router.post('/', criarLivro);
router.put('/:id', atualizarLivro);
router.delete('/:id', excluirLivro);

module.exports = router;