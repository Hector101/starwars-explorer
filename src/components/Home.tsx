import React from "react"
import { Link } from "react-router-dom"
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Grid
} from "@mui/material"

import Layout from "src/components/Shared/Layout"

const categories = [
  {
    img: 'https://res.cloudinary.com/dqssxfxct/image/upload/v1637446838/agnieszka-kowalczyk-c0VRNWVEjOA-unsplash_ljqmf6.jpg',
    title: 'People',
    to: 'people',
  },
  {
    img: 'https://res.cloudinary.com/dqssxfxct/image/upload/v1637446823/cade-roberts-EpIUbeFrqwQ-unsplash_levaif.jpg',
    title: 'Movies',
    to: 'movies'
  },
  {
    img: 'https://res.cloudinary.com/dqssxfxct/image/upload/v1637446566/nathan-anderson-eS7HrvG0mcA-unsplash_j8jqut.jpg',
    title: 'Planets',
    to: "planets",
  }
]

const Home = () => {
  return (
    <Layout>
      <ImageList component={Grid} cols={3} gap={8}>
        {categories.map((category) => (
          <ImageListItem key={category.img} component={Link} to={category.to}>
            <img
              src={`${category.img}?w=248&fit=crop&auto=format`}
              srcSet={`${category.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={category.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={category.title}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Layout>
  );
};

export default Home;
