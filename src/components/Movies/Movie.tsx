import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import {
  Paper,
  Typography,
  Stack,
  Box,
  Divider,
} from "@mui/material"
import { grey } from '@mui/material/colors'

import Layout from 'src/components/Shared/Layout'
import { selectMoviesState } from 'src/store/reducers/moviesReducer'
import { loadMovie } from 'src/store/actions/moviesAction'
import { useAppDispatch, useAppSelector } from 'src/store/hook'
import PageDetailSkeleton from 'src/components/Shared/PageDetailSkeleton'
import { wordify } from 'src/utils/string'

const Movie = () => {
  const { movieId } = useParams()
  const dispatch = useAppDispatch()
  const state = useAppSelector(selectMoviesState)

  useEffect(() => {
    if (!movieId) {
      return
    }

    dispatch(loadMovie(movieId))
  }, [movieId, dispatch])

  return (
    <Layout
      status={state.status}
      loader={<PageDetailSkeleton />}
      navTitle="Movie"
      isDetailPage={true}
    >
      <Paper elevation={0} sx={{ padding: 4 }}>
        {state.movie && (
          <>
            <Typography variant="h4">{state.movie.title}</Typography>
            <Stack spacing={2} mt={2}>
              {Object.entries(state.movie).map(([key, value]) => {
                if (key === "title") return null;
                return (
                  <Box color={grey[700]}>
                    <Typography sx={{ textTransform: "capitalize" }}>
                      {wordify(key)}
                    </Typography>
                    <Typography variant="h6">{value}</Typography>
                    <Divider />
                  </Box>
                );
              })}
            </Stack>
          </>
        )}
      </Paper>
    </Layout>
  )
}

export default Movie
