import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import {
  Paper,
  Typography,
  Stack,
  Box,
  Divider,
} from "@mui/material"
import { grey } from '@mui/material/colors'

import Layout from 'src/components/Shared/Layout'
import { selectPeopleState } from 'src/store/reducers/peopleReducer'
import { loadPerson } from 'src/store/actions/peopleAction'
import { useAppDispatch, useAppSelector } from 'src/store/hook'
import PageListingSkeleton from 'src/components/Shared/PageListingSkeleton'
import { wordify } from 'src/utils/string'

const Person = () => {
  const { personId } = useParams()
  const dispatch = useAppDispatch()
  const state = useAppSelector(selectPeopleState)

  useEffect(() => {
    if (!personId) {
      return
    }

    dispatch(loadPerson(personId))
  }, [personId, dispatch])

  return (
    <Layout
      status={state.status}
      loader={<PageListingSkeleton />}
      goBackToPath="/people"
      navTitle="Person"
    >
      <Paper elevation={0} sx={{ padding: 4 }}>
        {state.person && (
          <>
            <Typography variant="h4">{state.person.name}</Typography>
            <Stack spacing={2} mt={2}>
              {Object.entries(state.person).map(([key, value]) => {
                if (key === "name") return null;
                return (
                  <Box color={grey[700]}>
                    <Typography sx={{ textTransform: "capitalize" }}>
                      {wordify(key)}
                    </Typography>
                    <Typography variant="h6">{value}</Typography>
                    <Divider />
                  </Box>
                );
              })}
            </Stack>
          </>
        )}
      </Paper>
    </Layout>
  )
}

export default Person
