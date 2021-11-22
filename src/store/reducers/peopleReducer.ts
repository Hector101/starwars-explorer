import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

import { ApiResponse, Person } from 'src/types'
import { loadPeople, loadPerson } from 'src/store/actions/peopleAction'

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
      .addCase(loadPeople.rejected, (state) => {
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

export const selectPeopleState = (state: RootState) => state.people

export const { reducer: peopleReducer } =  peopleSlice
