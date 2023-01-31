import {
  Container,
  CssBaseline,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import logo from '../assets/images/logo.png';
import hero from '../assets/images/hero.webp';

const Landing = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth='xl'>
        <div>
          <img src={logo} alt='superfood logo' height={150} />
        </div>
        <Grid container spacing={6} justifyContent='space-between'>
          <Grid item xs={12} md={6} marginTop={10}>
            <div>
              <Typography variant='h4' gutterBottom>
                Find your healthy food!
              </Typography>
              <Typography variant='p'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
              <Button variant='contained'>LogIn / Register</Button>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src={hero} alt='images with food' height={500} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Landing;
