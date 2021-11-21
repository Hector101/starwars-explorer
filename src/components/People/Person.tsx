import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import {
  Paper,
  Typography,
  Stack,
  Box,
  Divider,
  Button
} from "@mui/material"
import { grey } from '@mui/material/colors'

import Layout from 'src/components/Layout'
import { loadPerson, selectPeople } from 'src/store/reducers/peopleStore'
import { useAppDispatch, useAppSelector } from 'src/store/hook'
import PersonSkeleton from './PersonSkeleton'
import { wordify } from 'src/utils/string'

const Person = () => {
  const { personId } = useParams()
  const dispatch = useAppDispatch()
  const state = useAppSelector(selectPeople)

  useEffect(() => {
    if (!personId) {
      return
    }

    dispatch(loadPerson(personId))
  }, [personId])

  return (
    <Layout status={state.status} loader={<PersonSkeleton />} goBackToPath="/people">
      <Paper elevation={0} sx={{ padding: 4 }}>
        {state.person && (
          <>
          <Typography variant="h4">{state.person.name}</Typography>
          <Stack spacing={2} mt={2}>
            {Object.entries(state.person).map(([title, description]) => {
              if (title === 'name') return null
              return (
              <Box color={grey[700]}>
                <Typography sx={{ textTransform: 'capitalize' }}>{wordify(title)}</Typography>
                <Typography variant="h6">{description}</Typography>
                <Divider />
              </Box>
              )}
            )}
          </Stack>
          </>
        )}
      </Paper>
    </Layout>
  );
}

export default Person
