import React from 'react'
import {
  Box,
  Button,
} from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { useGotoPage } from 'src/hooks/useGotoPage'

type PaginationProps = {
  next: string | null
  previous: string | null
  pathName: string
}

const Pagination: React.FC<PaginationProps> = ({
  pathName,
  next,
  previous,
}) => {

  const { handleGoToNext, handleGoToPrevious } = useGotoPage({
    pathName,
    next,
    previous,
  })

  return (
    <Box sx={{ position: "relative", py: 2 }}>
      {previous && (
        <Button
          startIcon={<ArrowBackIcon />}
          sx={{ position: "absolute", left: 0 }}
          onClick={handleGoToPrevious}
        >
          Previous
        </Button>
      )}
      {next && (
        <Button
          endIcon={<ArrowForwardIcon />}
          sx={{ position: "absolute", right: 0 }}
          onClick={handleGoToNext}
        >
          Next
        </Button>
      )}
    </Box>
  )
}

export default Pagination
