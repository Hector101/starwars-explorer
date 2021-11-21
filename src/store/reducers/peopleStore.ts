import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '..'

import { apiFetch } from 'src/utils/apiFetch'
import { ApiResponse, Person } from 'src/types'

export type PeopleState = & {
  people: ApiResponse<Person[]>
  person: Person | null
  status: 'loading' | 'failed' | 'loaded'
}

const peopleInitialState = {
  count: 0,
  next: null,
  previous: null,
  results: [],
}

const initialState: PeopleState = {
  people: peopleInitialState,
  person: null,
  status: 'loading',
}

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

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPeople.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadPeople.fulfilled, (state, action) => {
        state.status = 'loaded'
        state.people = action.payload
      })
      .addCase(loadPeople.rejected, (state, action) => {
        console.log(action, '<<<<<<<lLLLL<<<<<<<<<<')
        state.status = 'failed'
        state.people = peopleInitialState
      })
      .addCase(loadPerson.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadPerson.fulfilled, (state, action) => {
        state.status = 'loaded'
        state.person = action.payload
      })
      .addCase(loadPerson.rejected, (state) => {
        state.status = 'failed'
        state.person = null
      })
  },
})

export const selectPeople = (state: RootState) => state.people

export const { reducer: peopleReducer } =  peopleSlice
