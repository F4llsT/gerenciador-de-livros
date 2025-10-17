const express = require('express');
const router = express.Router();
const { listarLivros, criarLivro } = require('../controllers/livrosController');

// Rotas
router.get('/', listarLivros);
router.post('/', criarLivro);

module.exports = router;