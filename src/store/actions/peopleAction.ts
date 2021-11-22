import { createAsyncThunk} from '@reduxjs/toolkit'

import { apiFetch } from 'src/utils/apiFetch'
import { ApiResponse, Person } from 'src/types'


export const loadPeople = createAsyncThunk(
  'people/loadPeople',
  async (url: string) => {
    const response = await apiFetch<ApiResponse<Person[]>>(url)
    return response
  }
)

export const loadPerson = createAsyncThunk(
  "people/loadPerson",
  async (personId: string) => {
    const response = await apiFetch<Person>(`/api/people/${personId}`)
    const { name, height, mass, hair_color, skin_color, gender, birth_year } =
      response
    return { name, height, mass, hair_color, skin_color, gender, birth_year }
  }
)
