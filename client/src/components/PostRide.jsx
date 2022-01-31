import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import {
  LocalizationProvider,
  DatePicker,
} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

function PostRide({ userId }) {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();
  const handleFormOnSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formToSend = {
      email: data.get('start'),
      password: data.get('destination'),
      date: data.get('date'),
      brand: data.get('brand'),
      model: data.get('model'),
      year: date.getFullYear(),
      price: data.get('price'),
    };
    console.log(formToSend);
    navigate('/');
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        <Typography component="h1" variant="h5">Post Ride</Typography>
        <Box component="form" onSubmit={handleFormOnSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField required fullWidth id="start" label="Departure City, State" name="start" autoComplete="start" autoFocus />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth id="destination" label="Destination City, State" name="destination" autoComplete="destination" />
            </Grid>
            <Grid item xs={12}>
              <TextField required id="date" name="date" label="Departure Date" type="date" sx={{ width: 220 }} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth id="brand" label="Car Brand" name="brand" autoComplete="car-brand" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth id="model" label="Car Model" name="model" autoComplete="car-model" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker views={['year']} id="year" name="year" label="Year only" value={date} minDate={new Date('2012-03-01')} maxDate={new Date('2023-06-01')} onChange={(newValue) => setDate(newValue)} renderInput={(params) => <TextField {...params} helperText={null} />} />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth id="price" label="Ride Price" name="price" autoComplete="price" />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Post
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default PostRide;
