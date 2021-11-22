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
import { loadPerson } from 'src/store/actions/peopleAction'
import { useAppDispatch, useAppSelector } from 'src/store/hook'
import PageListingSkeleton from 'src/components/Shared/PageListingSkeleton'
import { wordify } from 'src/utils/string'

const Movie = () => {
  const { movieId } = useParams()
  const dispatch = useAppDispatch()
  const state = useAppSelector(selectMoviesState)

  useEffect(() => {
    if (!movieId) {
      return
    }

    dispatch(loadPerson(movieId))
  }, [movieId, dispatch])

  return (
    <Layout
      status={state.status}
      loader={<PageListingSkeleton />}
      goBackToPath="/movies"
      navTitle="Movie"
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
                    {Array.isArray(value) ? (
                      <Typography variant="h6">{value.join(", ")}</Typography>
                    ) : (
                      <Typography variant="h6">{value}</Typography>
                    )}
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
