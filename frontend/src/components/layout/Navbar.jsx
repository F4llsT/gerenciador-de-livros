import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { Book as BookIcon } from '@mui/icons-material'

const Navbar = () => {
  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BookIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: { xs: 1, md: 0 },
            }}
          >
            Gerenciador de Livros
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', ml: 3 }}>
            <Button
              component={RouterLink}
              to="/"
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Início
            </Button>
            <Button
              component={RouterLink}
              to="/livros"
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Livros
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar