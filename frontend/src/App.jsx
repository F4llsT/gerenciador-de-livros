import { Container, CssBaseline, Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HomePage from '@/pages/HomePage'
import LivrosPage from '@/pages/livros/LivrosPage'
import NotFound from '@/pages/NotFound'
import NovoLivro from '@/pages/livros/NovoLivro'

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <CssBaseline />
      <Navbar />
      <Container
        component="main"
        maxWidth="xl"
        sx={{ flex: 1, py: 4, px: { xs: 2, sm: 3 } }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/livros" element={<LivrosPage />} />
          <Route path="/livros/novo" element={<NovoLivro />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </Box>
  )
}

export default App