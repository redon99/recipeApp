import { Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import errorSvg from '../assets/images/undraw_page_not_found_re_e9o6.svg';

const Error = () => {
  return (
    <Container maxWidth='xl'>
      <Grid container justifyContent='center'>
        <Grid item>
          <img src={errorSvg} alt='404 not found' />
          <Typography>Page not found</Typography>
          <Link to='/'>Back to home</Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Error;
