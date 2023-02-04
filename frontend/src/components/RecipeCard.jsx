import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAppContext } from '../context/appContext';
import { Link } from 'react-router-dom';

export default function ImgMediaCard(props) {
  const { setEditRecipe, deleteRecipe } = useAppContext();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component='img'
        alt={props.title}
        height='140'
        src={props.imgURL}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {props.title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          component={Link}
          to='/add-recipe'
          onClick={() => setEditRecipe(props.id)}
        >
          Edit
        </Button>
        <Button size='small' onClick={() => deleteRecipe(props.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
