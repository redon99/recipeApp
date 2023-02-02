import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Alert from './../../components/Alert';
import FormField from './../../components/FormField';
import { Grid, Button } from '@mui/material';

import { useAppContext } from '../../context/appContext';
const Profile = () => {
  const { user, updateUser, showAlert, displayAlert, isLoading } =
    useAppContext();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);

  const handleSubmit = e => {
    e.preventDefault();
    if ((!firstName, !lastName, !email)) {
      displayAlert(); //BUG not showing
      return;
    }
    updateUser({ firstName, lastName, email });
  };
  return (
    <>
      <Typography variant='h5' sx={{ mb: 4 }}>
        Profile
      </Typography>
      {showAlert && <Alert />}
      <Box component='form' onSubmit={handleSubmit}>
        <Grid container sx={{ height: '100vh' }} spacing={2}>
          <Grid item>
            <FormField
              type='text'
              name='firstName'
              label={'First Name'}
              value={firstName}
              handleChange={e => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <FormField
              type='text'
              name='lastName'
              label={'Last Name'}
              value={lastName}
              handleChange={e => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <FormField
              type='email'
              name='email'
              label={'email'}
              value={email}
              handleChange={e => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? 'Wait...' : 'Save changes'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Profile;
