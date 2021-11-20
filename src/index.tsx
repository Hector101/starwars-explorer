import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import reportWebVitals from './reportWebVitals'
import { store } from 'src/store'
import theme from 'src/design/theme'

import Home from './components/Home'
import People from './components/People'
import Person from './components/People/Person'
import Movies from './components/Movies'
import Movie from './components/Movies/Movie'
import Planets from './components/Planets'
import Planet from './components/Planets/Planet'


import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="people" element={<People />}>
              <Route path=":id" element={<Person />} />
            </Route>
            <Route path="movies" element={<Movies />}>
              <Route path=":id" element={<Movie />} />
            </Route>
            <Route path="planets" element={<Planets />}>
              <Route path=":id" element={<Planet />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals()
