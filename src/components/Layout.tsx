import React from 'react'
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { grey } from '@mui/material/colors'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from "react-router-dom"

type LayoutProps =
  | { status: 'loading' | 'failed' | 'loaded', loader: React.ReactElement }
  | { status?: never, loader?: never }

const Layout: React.FC<LayoutProps & { goBackToPath?: string }> = ({
  children,
  status,
  loader,
  goBackToPath
}) => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    if (goBackToPath) {
      navigate(goBackToPath)
    }
  }

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
      <Box
        sx={{
          bgcolor: grey[200],
          minHeight: "calc(100vh - 64px)",
          padding: { xs: 2, md: 4 },
        }}
      >
        <Box sx={{ maxWidth: 600, marginX: "auto" }}>
          {status === "loading" && <>{loader}</>}
          {status === "failed" && <Typography>Error</Typography>}
          {(status === "loaded" || !status) && (
            <>
              {goBackToPath && (
                <Button startIcon={<ArrowBackIcon />} sx={{ mb: 2 }} onClick={handleGoBack}>
                  Go Back
                </Button>
              )}
              {children}
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Layout
