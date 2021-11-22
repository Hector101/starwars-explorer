import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import { peopleReducer } from 'src/store/reducers/peopleReducer'
import { moviesReducer } from 'src/store/reducers/moviesReducer'
import { planetsReducer } from 'src/store/reducers/planetsReducer'

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    movies: moviesReducer,
    planets: planetsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
