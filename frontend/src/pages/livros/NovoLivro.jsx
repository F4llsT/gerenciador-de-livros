import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';

const NovoLivro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    ano: '',
    preco: '',
  });
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    try {
      // Formata o preço substituindo vírgula por ponto
      const precoFormatado = formData.preco.toString().replace(',', '.');
      
      const dadosEnvio = {
        titulo: formData.titulo.trim(),
        autor: formData.autor.trim(),
        ano: Number(formData.ano),
        preco: Number(precoFormatado)
      };

      console.log('Enviando dados:', dadosEnvio);

      const response = await api.post('/livros', dadosEnvio);
      console.log('Resposta do servidor:', response);

      if (response) {
        navigate('/livros');
      }
    } catch (error) {
      console.error('Erro detalhado:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      setErro(
        error.response?.data?.message || 
        'Erro ao adicionar o livro. Verifique os dados e tente novamente.'
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Adicionar Novo Livro
        </Typography>

        {erro && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {erro}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="titulo"
            label="Título do Livro"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="autor"
            label="Autor"
            name="autor"
            value={formData.autor}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="ano"
            label="Ano de Publicação"
            name="ano"
            type="number"
            value={formData.ano}
            onChange={handleChange}
            inputProps={{ min: '1000', max: new Date().getFullYear() }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="preco"
            label="Preço"
            name="preco"
            type="text"
            value={formData.preco}
            onChange={(e) => {
              // Permite apenas números e vírgula
              const value = e.target.value.replace(/[^0-9,]/g, '');
              setFormData(prev => ({ ...prev, preco: value }));
            }}
            inputProps={{
              inputMode: 'decimal',
              pattern: '[0-9]+([,][0-9]{1,2})?'
            }}
            InputProps={{
              startAdornment: 'R$ ',
            }}
            helperText="Use vírgula como separador decimal (ex: 29,90)"
          />
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate('/livros')}
              disabled={carregando}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={carregando}
              sx={{ ml: 1 }}
            >
              {carregando ? 'Salvando...' : 'Salvar Livro'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default NovoLivro;