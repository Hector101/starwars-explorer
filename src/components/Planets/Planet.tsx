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
import { selectPlanetsState } from 'src/store/reducers/planetsReducer'
import { loadPlanet } from 'src/store/actions/planetsAction'
import { useAppDispatch, useAppSelector } from 'src/store/hook'
import PageListingSkeleton from 'src/components/Shared/PageListingSkeleton'
import { wordify } from 'src/utils/string'

const Planet = () => {
  const { planetId } = useParams()
  const dispatch = useAppDispatch()
  const state = useAppSelector(selectPlanetsState)

  useEffect(() => {
    if (!planetId) {
      return
    }

    dispatch(loadPlanet(planetId))
  }, [planetId, dispatch])

  return (
    <Layout
      status={state.status}
      loader={<PageListingSkeleton />}
      goBackToPath="/planets"
      navTitle="Planet"
    >
      <Paper elevation={0} sx={{ padding: 4 }}>
        {state.planet && (
          <>
            <Typography variant="h4">{state.planet.title}</Typography>
            <Stack spacing={2} mt={2}>
              {Object.entries(state.planet).map(([key, value]) => {
                if (key === "title") return null;
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

export default Planet
