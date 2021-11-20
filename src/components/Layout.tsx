import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import MenuIcon from '@mui/icons-material/Menu'

type LayoutProps = {
  status?: 'loading' | 'failed' | 'loaded'
}

const Layout: React.FC<LayoutProps> = ({
  children,
  status,
}) => {
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Star Wars Explorer
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <Container>
      {status === 'loading' && (
        <Typography>Loading</Typography>
      )}
      {status === 'failed' && (
        <Typography>Error</Typography>
      )}
      {(status === 'loaded' || !status ) && (
        <>
          {children}
        </>
      )}
    </Container>
    </>
  )
}

export default Layout
