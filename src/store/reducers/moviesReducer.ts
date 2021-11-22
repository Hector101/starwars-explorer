import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

import { ApiResponse, Movie } from 'src/types'
import { loadMovies, loadMovie } from 'src/store/actions/moviesAction'

export type MoviesState = & {
  movies: ApiResponse<Movie[]>
  movie: Movie | null
  status: 'loading' | 'failed' | 'loaded'
}

const moviesInitialState = {
  count: 0,
  next: null,
  previous: null,
  results: [],
}

const initialState: MoviesState = {
  movies: moviesInitialState,
  movie: null,
  status: 'loading',
}

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMovies.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadMovies.fulfilled, (state, action) => {
        state.status = 'loaded'
        state.movies = action.payload
      })
      .addCase(loadMovies.rejected, (state) => {
        state.status = 'failed'
        state.movies = moviesInitialState
      })
      .addCase(loadMovie.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadMovie.fulfilled, (state, action) => {
        state.status = 'loaded'
        state.movie = action.payload
      })
      .addCase(loadMovie.rejected, (state) => {
        state.status = 'failed'
        state.movie = null
      })
  },
})

export const selectMoviesState = (state: RootState) => state.movies

export const { reducer: moviesReducer } =  moviesSlice
