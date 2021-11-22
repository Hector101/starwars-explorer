import { createAsyncThunk} from '@reduxjs/toolkit'

import { apiFetch } from 'src/utils/apiFetch'
import { ApiResponse, Planet } from 'src/types'

export const loadPlanets = createAsyncThunk(
  'planets/loadPlanets',
  async (url: string) => {
    const response = await apiFetch<ApiResponse<Planet[]>>(url)
    return response
  }
)

export const loadPlanet = createAsyncThunk(
  "planets/loadPlanet",
  async (planetId: string) => {
    const response = await apiFetch<Planet>(`/api/planets/${planetId}`)
    const { title, terrain, population } = response
    return { title, terrain, population }
  }
)
