// src/pages/NotFound.jsx
import { Box, Typography, Button, Container, Stack } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { Error as ErrorIcon } from '@mui/icons-material'

const NotFound = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Stack spacing={4} alignItems="center" textAlign="center">
        <ErrorIcon sx={{ fontSize: 80, color: 'error.main' }} />
        <Typography variant="h3" component="h1" gutterBottom>
          Página não encontrada
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          A página que você está procurando não existe ou foi movida.
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
        >
          Voltar para a página inicial
        </Button>
      </Stack>
    </Container>
  )
}

export default NotFound