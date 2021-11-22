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
import { useNavigate, Link } from 'react-router-dom'

type LayoutStatusProps =
  | { status: 'loading' | 'failed' | 'loaded', loader: React.ReactElement }
  | { status?: never, loader?: never }

type OtherLayoutProps = {
  navTitle?: string
  isDetailPage?: boolean
  hasGobackButton?: boolean
}

type LayoutProps = LayoutStatusProps & OtherLayoutProps

const Layout: React.FC<LayoutProps> = ({
  children,
  status,
  loader,
  navTitle = 'Star Wars Explorer',
  isDetailPage = false,
  hasGobackButton = true,
}) => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    if (isDetailPage) {
      navigate(-1)
      return
    }
    navigate('/')
  }

  const handleReload = () => {
    window.location.reload()
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
              {navTitle}
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
          {status === "failed" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: 'column',
                textAlign: "center",
              }}
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                An Error occurred,{" "}
                <Typography
                  variant="h6"
                  sx={{
                    textDecoration: 'underline',
                    display: 'inline-block',
                    cursor: 'pointer'
                  }}
                  onClick={handleReload}
                >
                  try again.
                </Typography>
              </Typography>
              <Button variant="contained" component={Link} to="/" sx={{ mt: 2 }}>
                Go Back Home
              </Button>
            </Box>
          )}
          {(status === "loaded" || !status) && (
            <>
              {hasGobackButton && (
                <Button
                  startIcon={<ArrowBackIcon />}
                  sx={{ mb: 2 }}
                  onClick={handleGoBack}
                >
                  {isDetailPage ? 'Go Back' : 'Go Back Home'}
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
