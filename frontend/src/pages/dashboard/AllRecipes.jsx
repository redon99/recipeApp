import React, { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { Grid, Box } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

import Recipe from '../../components/Recipe';

const AllRecipes = () => {
  const {
    getAllRecipes,
    recipes,
    title,
    prepTime,
    servings,
    totalRecipes,
    cuisine,
    imgURL,
    isLoading,
    recipeDesciption,
  } = useAppContext();

  useEffect(() => {
    getAllRecipes();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  if (recipes.length === 0) {
    return <h2>No recipes found...</h2>;
  }

  return (
    <div>
      <h3>
        {totalRecipes} recipe{recipes.length > 1 && 's'} found
      </h3>
      <Grid container spacing={4}>
        {recipes.map(recipe => {
          return <Recipe key={recipe._id} {...recipe} />;
        })}
      </Grid>
    </div>
  );
};

export default AllRecipes;
