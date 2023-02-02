import React from 'react';
import { TextField } from '@mui/material';

const FormField = ({ type, name, value, handleChange, label }) => {
  return (
    <TextField
      autoComplete='given-name'
      name={name}
      // required
      fullWidth
      id={name}
      label={label}
      value={value}
      type={type}
      autoFocus
      onChange={handleChange}
    />
  );
};

export default FormField;
