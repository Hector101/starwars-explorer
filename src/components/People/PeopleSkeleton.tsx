import React from 'react'
import {
  List,
  ListItem,
  Skeleton,
  ListItemAvatar,
  ListItemButton,
  Avatar
} from "@mui/material"

const PeopleSkeleton = () => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {Array(10).fill(0).map(() => (
        <ListItem>
          <ListItemButton>
            <ListItemAvatar>
              <Skeleton animation="wave" variant="circular" width={40} height={40} />
            </ListItemAvatar>
            <Skeleton
              animation="wave"
              height={10}
              width="15%"
              style={{ marginBottom: 6 }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default PeopleSkeleton
