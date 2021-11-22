import { createAsyncThunk} from '@reduxjs/toolkit'

import { apiFetch } from 'src/utils/apiFetch'
import { ApiResponse, Movie } from 'src/types'

export const loadMovies = createAsyncThunk(
  'movies/loadMovies',
  async (url: string) => {
    const response = await apiFetch<ApiResponse<Movie[]>>(url)
    return response
  }
)

export const loadMovie = createAsyncThunk(
  "movies/loadMovie",
  async (movieId: string) => {
    const response = await apiFetch<Movie>(`/api/films/${movieId}`)
    const { title, director, producer } = response
    return { title, director, producer }
  }
)
