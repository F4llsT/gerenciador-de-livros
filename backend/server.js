require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./src/config/db');
const livrosRoutes = require('./src/routes/livrosRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/livros', livrosRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API do Gerenciador de Livros está funcionando!');
});

// Iniciar o servidor
async function startServer() {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
}

startServer();