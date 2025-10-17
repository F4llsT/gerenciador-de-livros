// frontend/src/pages/livros/EditarLivro.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  CircularProgress,
  Alert,
  InputAdornment
} from '@mui/material';
import api from '@/services/api';

const EditarLivro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [livro, setLivro] = useState({
    titulo: '',
    autor: '',
    ano: '',
    preco: ''
  });

  useEffect(() => {
    const carregarLivro = async () => {
      try {
        const response = await api.get(`/livros/${id}`);
        setLivro(response.data);
      } catch (err) {
        setError('Erro ao carregar o livro');
      } finally {
        setLoading(false);
      }
    };

    carregarLivro();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLivro(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Formata o preço substituindo vírgula por ponto
      const precoFormatado = livro.preco.toString().replace(',', '.');
      
      const dadosAtualizados = {
        titulo: livro.titulo.trim(),
        autor: livro.autor.trim(),
        ano: Number(livro.ano),
        preco: Number(precoFormatado)
      };

      console.log('Enviando dados para atualização:', dadosAtualizados);
      
      const response = await api.put(`/livros/${id}`, dadosAtualizados);
      console.log('Resposta da API:', response.data);
      
      navigate('/livros');
    } catch (err) {
      console.error('Erro detalhado:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError('Erro ao atualizar o livro. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Editar Livro
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Título"
            name="titulo"
            value={livro.titulo}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Autor"
            name="autor"
            value={livro.autor}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Ano"
            name="ano"
            type="number"
            inputProps={{ min: 1000, max: new Date().getFullYear() + 1 }}
            value={livro.ano}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Preço"
            name="preco"
            type="text"
            inputMode="decimal"
            value={livro.preco}
            onChange={(e) => {
              // Permite apenas números e vírgula
              const value = e.target.value.replace(/[^0-9,]/g, '');
              // Garante que haja apenas uma vírgula
              const parts = value.split(',');
              if (parts.length > 2) return;
              // Limita a 2 casas decimais
              if (parts[1] && parts[1].length > 2) return;
              
              setLivro(prev => ({
                ...prev,
                preco: value
              }));
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            }}
            required
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Salvar Alterações
            </Button>
            <Button 
              variant="outlined" 
              color="secondary" 
              sx={{ ml: 2 }}
              onClick={() => navigate('/livros')}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditarLivro;