import React from 'react';
import { Grid } from '@mui/material';
import { useAppContext } from '../context/appContext';
import RecipeCard from './RecipeCard';

const Recipe = props => {
  return (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <RecipeCard
        id={props._id}
        title={props.title}
        imageURL={props.imageURL}
        description={props.description}
      />
    </Grid>
  );
};

export default Recipe;
