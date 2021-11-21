import React, { useEffect } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Button,
  Box,
} from "@mui/material"
import { Link, useNavigate, useLocation } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { loadPeople, selectPeople } from 'src/store/reducers/peopleStore'
import { useAppDispatch, useAppSelector } from 'src/store/hook'
import Layout from 'src/components/Layout'
import PeopleSkeleton from './PeopleSkeleton'
import { parseSearchParams } from 'src/utils/string'

const People = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const dispatch = useAppDispatch()
  const state = useAppSelector(selectPeople)

  useEffect(() => {
    if (!location.search) {
      dispatch(loadPeople('/api/people'))
      return
    }

    dispatch(loadPeople(`/api/people/${location.search}`))
  }, [location])

  const handleGoToNext = () => {
    if (state.people.next) {
      const queryParam = new URL(state.people.next).search
      navigate(`/people/${queryParam}`)
    }
  }

  const handleGoToPrevious = () => {
    if (state.people.previous) {
      const queryParam = new URL(state.people.previous).search
      const param = parseSearchParams(queryParam)

      if (param.page === '1') {
        navigate('/people')
        return
      }
      navigate(`/people/${queryParam}`)
    }
  }

  console.log(state.people, '<<<<<<<<<<<<<<,')

  return (
    <Layout status={state.status} loader={<PeopleSkeleton />} goBackToPath="/">
      {state.people.results.map((person, index) => (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItem>
            <ListItemButton component={Link} to={`/people/${index + 1}`}>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary={person.name} />
            </ListItemButton>
          </ListItem>
        </List>
      ))}
      <Box sx={{ position: "relative", py: 2 }}>
        {state.people.previous && (
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{ position: "absolute", left: 0 }}
            onClick={handleGoToPrevious}
          >
            Previous
          </Button>
        )}
        {state.people.next && (
          <Button
            endIcon={<ArrowForwardIcon />}
            sx={{ position: "absolute", right: 0 }}
            onClick={handleGoToNext}
          >
            Next
          </Button>
        )}
      </Box>
    </Layout>
  );
}

export default People
