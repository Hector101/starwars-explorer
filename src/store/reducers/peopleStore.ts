import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '..'

import { apiFetch } from 'src/utils/apiFetch'
import { ApiResponse, Person } from 'src/types'

export type PeopleState = & {
  data: ApiResponse<Person[]>
  status: 'idle' | 'loading' | 'failed'
}

const initialData = {
  count: 0,
  next: null,
  previous: null,
  results: [],
}

const initialState: PeopleState = {
  data: initialData,
  status: 'idle',
}

export const loadPeople = createAsyncThunk(
  'people/loadPeople',
  async () => {
    const response = await apiFetch<ApiResponse<Person[]>>('/api/people')
    return response
  }
)

export const loadMorePeople = createAsyncThunk(
  'people/loadMorePeople',
  async (url: string) => {
    const response = await apiFetch<ApiResponse<Person[]>>(url, { isFullUrl: true })
    return response
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
        state.status = 'idle'
        state.data = action.payload
      })
      .addCase(loadPeople.rejected, (state) => {
        state.status = 'failed'
        state.data = initialData
      })
      .addCase(loadMorePeople.pending, (state) => {
        state.status = 'loading'
        state.data = initialData
      })
      .addCase(loadMorePeople.fulfilled, (state, action) => {
        state.status = 'idle'
        state.data = action.payload
      })
      .addCase(loadMorePeople.rejected, (state) => {
        state.status = 'failed'
        state.data = initialData
      })
  },
})

export const selectPeople = (state: RootState) => state.people


export const { reducer: peopleReducer } =  peopleSlice
