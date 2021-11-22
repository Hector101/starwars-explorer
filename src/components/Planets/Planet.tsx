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
import PageDetailSkeleton from 'src/components/Shared/PageDetailSkeleton'
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
      loader={<PageDetailSkeleton />}
      navTitle="Planet"
      isDetailPage={true}
    >
      <Paper elevation={0} sx={{ padding: 4 }}>
        {state.planet && (
          <>
            <Typography variant="h4">{state.planet.name}</Typography>
            <Stack spacing={2} mt={2}>
              {Object.entries(state.planet).map(([key, value]) => {
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

export default Planet
