import React, { useEffect, useState } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
} from "@mui/material"
import { Link, useLocation } from 'react-router-dom'
import MovieIcon from '@mui/icons-material/Movie'

import { selectMoviesState } from 'src/store/reducers/moviesReducer'
import { loadMovies } from 'src/store/actions/moviesAction'
import { useAppDispatch, useAppSelector } from 'src/store/hook'
import Layout from 'src/components/Shared/Layout'
import PageListingSkeleton from 'src/components/Shared/PageListingSkeleton'
import { parseSearchParams } from 'src/utils/string'
import Pagination from 'src/components/Shared/Pagination'

const Movies = () => {
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState(0)

  const dispatch = useAppDispatch()
  const state = useAppSelector(selectMoviesState)

  useEffect(() => {
    if (!location.search) {
      setCurrentPage(0)
      dispatch(loadMovies('/api/films'))
      return
    }

    const param = parseSearchParams(location.search)
    const pageNumber = Number(param.page)
    setCurrentPage((pageNumber - 1) * 10)
    dispatch(loadMovies(`/api/films/${location.search}`))
  }, [location, dispatch])

  return (
    <Layout
      status={state.status}
      loader={<PageListingSkeleton />}
      navTitle="Movies"
    >
      {state.movies.results.map((movie, index) => (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItem>
            <ListItemButton
              component={Link}
              to={`/movies/${currentPage + index + 1}`}
            >
              <ListItemAvatar>
                <MovieIcon />
              </ListItemAvatar>
              <ListItemText primary={movie.title} />
            </ListItemButton>
          </ListItem>
        </List>
      ))}
      <Pagination
        next={state.movies.next}
        previous={state.movies.previous}
        pathName="movies"
      />
    </Layout>
  )
}

export default Movies
