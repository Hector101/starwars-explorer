import React from 'react'
import {
  Paper,
  Skeleton,
  Stack,
  Divider,
} from "@mui/material"

const PageDetailSkeleton = () => {
  return (
  <Paper elevation={0} sx={{ padding: 4 }}>
    <Skeleton
      animation="wave"
      height={15}
      width="30%"
      style={{ marginBottom: 6 }}
    />
    {Array(6).fill(0).map(() => (
      <Stack spacing={0} mt={2}>
        <Skeleton
          animation="wave"
          height={10}
          width="15%"
          style={{ marginBottom: 6 }}
        />
        <Skeleton
          animation="wave"
          height={15}
          width="20%"
          style={{ marginBottom: 6 }}
        />
        <Divider />
      </Stack>
    ))}
  </Paper>
  )
}

export default PageDetailSkeleton
