import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

import Layout from 'src/components/Layout'

const Home = () => {
  return (
    <Layout>
      <Link to="people">
        <Button>
          People
        </Button>
      </Link>
      <Link to="movies">
        <Button>
          Movies
        </Button>
      </Link>
      <Link to="planets">
        <Button>
          Planets
        </Button>
      </Link>
    </Layout>
  )
}

export default Home
