import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../store'

import { apiFetch } from 'utils/apiFetch'

export type PeopleState = {
  value: any
  status: 'idle' | 'loading' | 'failed'
}

const initialState: PeopleState = {
  value: 0,
  status: 'idle',
}

export const loadPeople = createAsyncThunk(
  'people/loadPeople',
  async () => {
    const response = await apiFetch('/people')
    console.log(response, '<<<<<<<<<<<<<')
    return response
  }
);

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    loadPeopleAction: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPeople.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadPeople.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value = action.payload
      })
      .addCase(loadPeople.rejected, (state) => {
        state.status = 'failed'
      });
  },
});

export const { loadPeopleAction } = peopleSlice.actions

export const selectPeople = (state: RootState) => state.people.value


export const { reducer: peopleReducer } =  peopleSlice
