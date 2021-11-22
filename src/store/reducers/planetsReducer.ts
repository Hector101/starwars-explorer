import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

import { ApiResponse, Planet } from 'src/types'
import { loadPlanets, loadPlanet } from 'src/store/actions/planetsAction'

export type PlanetsState = & {
  planets: ApiResponse<Planet[]>
  planet: Planet | null
  status: 'loading' | 'failed' | 'loaded'
}

const planetsInitialState = {
  count: 0,
  next: null,
  previous: null,
  results: [],
}

const initialState: PlanetsState = {
  planets: planetsInitialState,
  planet: null,
  status: 'loading',
}

export const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPlanets.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadPlanets.fulfilled, (state, action) => {
        state.status = 'loaded'
        state.planets = action.payload
      })
      .addCase(loadPlanets.rejected, (state) => {
        state.status = 'failed'
        state.planets = planetsInitialState
      })
      .addCase(loadPlanet.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadPlanet.fulfilled, (state, action) => {
        state.status = 'loaded'
        state.planet = action.payload
      })
      .addCase(loadPlanet.rejected, (state) => {
        state.status = 'failed'
        state.planet = null
      })
  },
})

export const selectPlanetsState = (state: RootState) => state.planets

export const { reducer: planetsReducer } =  planetsSlice
