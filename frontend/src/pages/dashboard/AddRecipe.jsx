import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Alert from './../../components/Alert';
import FormField from './../../components/FormField';
import { Grid, Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import { useAppContext } from '../../context/appContext';
import { convertLength } from '@mui/material/styles/cssUtils';

const AddRecipe = () => {
  const {
    showAlert,
    isEditing,
    isLoading,
    displayAlert,
    title,
    prepTime,
    servings,
    cuisineOptions,
    cuisine,
    imgURL,
    ingredients,
    recipeDescription,
    handleChange,
    clearValues,
    createRecipe,
  } = useAppContext();

  const handleRecipeInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!title || !recipeDescription) {
      displayAlert();
      return;
    }
    if (isEditing) {
      return;
    }
    createRecipe();
  };

  return (
    <>
      <Typography variant='h5' sx={{ mb: 4 }}>
        {isEditing ? 'Edit Recipe' : 'Add Recipe'}
      </Typography>
      {showAlert && <Alert />}
      <Box component='form' onSubmit={handleSubmit}>
        <Grid container sx={{ height: '100vh' }} spacing={2}>
          <Grid item>
            <FormField
              type='text'
              name='title'
              label={'Recipe Title'}
              value={title}
              handleChange={handleRecipeInput}
            />
          </Grid>
          <Grid item>
            <FormField
              type='text'
              name='imgURL'
              label={'Image url'}
              value={imgURL}
              handleChange={handleRecipeInput}
            />
          </Grid>
          <Grid item>
            <FormField
              type='number'
              name='prepTime'
              label={'Preperation Time'}
              value={prepTime}
              handleChange={handleRecipeInput}
            />
          </Grid>
          <Grid item>
            <FormField
              type='number'
              name='servings'
              label={'Servings'}
              value={servings}
              handleChange={handleRecipeInput}
            />
          </Grid>
          <Grid item>
            <InputLabel id='demo-simple-select-label'>Cuisine</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              name='cuisine'
              value={cuisine}
              label='cuisine'
              onChange={handleRecipeInput}
            >
              {cuisineOptions.map((item, i) => {
                return (
                  <MenuItem key={i} value={item} name={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item>
            <TextareaAutosize
              aria-label='minimum height'
              name='recipeDescription'
              minRows={3}
              placeholder='Minimum 3 rows'
              style={{ width: 200 }}
              onChange={handleRecipeInput}
            />
          </Grid>
          <Grid item>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </Button>
          </Grid>
          <Grid item>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              onClick={e => {
                e.preventDefault();
                clearValues();
              }}
              sx={{ mt: 3, mb: 2 }}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AddRecipe;
