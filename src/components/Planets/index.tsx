import React, { useEffect, useState } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
} from "@mui/material"
import { Link, useLocation } from 'react-router-dom'
import Brightness4Icon from '@mui/icons-material/Brightness4'

import { selectPlanetsState } from 'src/store/reducers/planetsReducer'
import { loadPlanets } from 'src/store/actions/planetsAction'
import { useAppDispatch, useAppSelector } from 'src/store/hook'
import Layout from 'src/components/Shared/Layout'
import PageListingSkeleton from 'src/components/Shared/PageListingSkeleton'
import { parseSearchParams } from 'src/utils/string'
import Pagination from 'src/components/Shared/Pagination'

const Planets = () => {
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState(0)

  const dispatch = useAppDispatch()
  const state = useAppSelector(selectPlanetsState)

  useEffect(() => {
    if (!location.search) {
      setCurrentPage(0)
      dispatch(loadPlanets('/api/planets'))
      return
    }

    const param = parseSearchParams(location.search)
    const pageNumber = Number(param.page)
    setCurrentPage((pageNumber - 1) * 10)
    dispatch(loadPlanets(`/api/planets/${location.search}`))
  }, [location, dispatch])

  return (
    <Layout
      status={state.status}
      loader={<PageListingSkeleton />}
      navTitle="Planets"
    >
      {state.planets.results.map((planet, index) => (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItem>
            <ListItemButton
              component={Link}
              to={`/planets/${currentPage + index + 1}`}
            >
              <ListItemAvatar>
                <Brightness4Icon />
              </ListItemAvatar>
              <ListItemText primary={planet.name} />
            </ListItemButton>
          </ListItem>
        </List>
      ))}
      <Pagination
        next={state.planets.next}
        previous={state.planets.previous}
        pathName="planets"
      />
    </Layout>
  )
}

export default Planets
