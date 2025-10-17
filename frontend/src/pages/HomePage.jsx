// src/pages/HomePage.jsx
import { Box, Typography, Button, Container, Stack } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { Book as BookIcon } from '@mui/icons-material'

const HomePage = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 8,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={4} alignItems="center">
          <BookIcon sx={{ fontSize: 80, color: 'primary.main' }} />
          <Typography variant="h3" component="h1" color="primary" gutterBottom>
            Bem-vindo ao Gerenciador de Livros
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Uma aplicação simples para gerenciar sua coleção de livros.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              component={RouterLink}
              to="/livros"
              variant="contained"
              size="large"
            >
              Ver Livros
            </Button>
            <Button
              component={RouterLink}
              to="/livros/novo"
              variant="outlined"
              size="large"
            >
              Adicionar Livro
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default HomePage