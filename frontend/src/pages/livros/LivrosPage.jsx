// src/pages/livros/LivrosPage.jsx
import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Container,
  Alert,
} from '@mui/material'
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import api from '@/services/api'
import { Add as AddIcon } from '@mui/icons-material'

const LivrosPage = () => {
  const [livros, setLivros] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const carregarLivros = async () => {
      try {
        const response = await api.get('/livros')
        setLivros(response.data)
      } catch (err) {
        setError('Erro ao carregar os livros')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    carregarLivros()
  }, [])

  const handleExcluir = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      try {
        await api.delete(`/livros/${id}`)
        setLivros(livros.filter((livro) => livro.id !== id))
      } catch (err) {
        setError('Erro ao excluir o livro')
        console.error(err)
      }
    }
  }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" component="h1">
          Lista de Livros
        </Typography>
        <Button
          component={RouterLink}
          to="/livros/novo"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            textTransform: 'none',
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4,
            },
          }}
        >
          Adicionar Livro
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell align="right">Ano</TableCell>
              <TableCell align="right">Preço</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {livros.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    Nenhum livro cadastrado
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              livros.map((livro) => (
                <TableRow key={livro.id}>
                  <TableCell>{livro.titulo}</TableCell>
                  <TableCell>{livro.autor}</TableCell>
                  <TableCell align="right">{livro.ano}</TableCell>
                  <TableCell align="right">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(livro.preco)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      component={RouterLink}
                      to={`/livros/editar/${livro.id}`}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleExcluir(livro.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default LivrosPage