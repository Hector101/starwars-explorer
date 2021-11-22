import React, { useEffect, useState } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  Avatar,
} from "@mui/material"
import { Link, useLocation } from 'react-router-dom'

import { selectPeopleState } from 'src/store/reducers/peopleReducer'
import { loadPeople } from 'src/store/actions/peopleAction'
import { useAppDispatch, useAppSelector } from 'src/store/hook'
import Layout from 'src/components/Shared/Layout'
import PageListingSkeleton from 'src/components/Shared/PageListingSkeleton'
import { parseSearchParams } from 'src/utils/string'
import Pagination from 'src/components/Shared/Pagination'

const People = () => {
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState(0)

  const dispatch = useAppDispatch()
  const state = useAppSelector(selectPeopleState)

  useEffect(() => {
    if (!location.search) {
      setCurrentPage(0)
      dispatch(loadPeople('/api/people'))
      return
    }

    const param = parseSearchParams(location.search)
    const pageNumber = Number(param.page)
    setCurrentPage((pageNumber - 1) * 10)
    dispatch(loadPeople(`/api/people/${location.search}`))
  }, [location, dispatch])

  return (
    <Layout
      status={state.status}
      loader={<PageListingSkeleton />}
      navTitle="People"
    >
      {state.people.results.map((person, index) => (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItem>
            <ListItemButton
              component={Link}
              to={`/people/${currentPage + index + 1}`}
            >
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary={person.name} />
            </ListItemButton>
          </ListItem>
        </List>
      ))}
      <Pagination
        next={state.people.next}
        previous={state.people.previous}
        pathName="people"
      />
    </Layout>
  )
}

export default People
