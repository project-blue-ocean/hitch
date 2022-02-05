import React, { useState, useContext } from 'react';
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
import Autocomplete from '@mui/material/Autocomplete';
import { AuthContext } from '../contexts/index.jsx';
import UScityNames from '../assets/cities';
import carData from '../assets/carData';

function PostRide() {
  const [date, setDate] = useState(new Date());
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');

  const navigate = useNavigate();
  const {
    currentUser, addRide, setToastShowing, setToastMessage, setToastType,
  } = useContext(AuthContext);
  const handleFormOnSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formToSend = {
      start: data.get('start'),
      destination: data.get('destination'),
      date: data.get('date'),
      brand: data.get('brand'),
      model: data.get('model'),
      year: date.getFullYear(),
      price: data.get('price'),
      driverId: currentUser.uid,
    };
    addRide(formToSend)
      .then(() => {
        setToastType('success');
        setToastMessage('Your ride was posted');
        setToastShowing(true);
        navigate('/');
      })
      .catch(() => {
        setToastType('error');
        setToastMessage('It wasn\'t possible to post your message');
        setToastShowing(true);
      });
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
              <Autocomplete
                sx={{ background: 'white', opacity: '.9', borderRadius: '6px' }}
                variant="filled"
                type="text"
                required
                fullWidth
                id="start"
                label="Departure City, State"
                autoComplete
                autoFocus
                disablePortal
                options={UScityNames}
                renderInput={(params) => <TextField {...params} name="start" label="Departure City, State" />}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                sx={{ background: 'white', opacity: '.9', borderRadius: '6px' }}
                variant="filled"
                type="text"
                required
                fullWidth
                id="destination"
                autoComplete
                autoFocus
                disablePortal
                options={UScityNames}
                renderInput={(params) => <TextField {...params} name="destination" label="Destination City, State" />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField required id="date" name="date" label="Departure Date" type="date" sx={{ width: 220 }} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                sx={{ background: 'white', opacity: '.9', borderRadius: '6px' }}
                variant="filled"
                type="text"
                required
                fullWidth
                id="brand"
                autoComplete
                onChange={(e) => {
                  const selectedMake = e.target.innerText;
                  setCarModel('');
                  setCarMake(selectedMake);
                }}
                disablePortal
                options={Object.keys(carData)}
                renderInput={(params) => <TextField {...params} name="brand" label="Make" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                sx={{ background: 'white', opacity: '.9', borderRadius: '6px' }}
                variant="filled"
                type="text"
                required
                fullWidth
                disabled={!carMake}
                value={carModel}
                onChange={(e) => setCarModel(e.target.innerText)}
                id="model"
                autoComplete
                disablePortal
                options={carMake ? carData[carMake].map((entry) => entry.model) : []}
                // TODO: add fallback for when carMake is undefined
                renderInput={(params) => <TextField {...params} name="model" label="Model" />}
              />

            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={['year']}
                  id="year"
                  name="year"
                  label="Car Year"
                  value={date}
                  minDate={new Date('1950-01-01')}
                  maxDate={new Date()}
                  onChange={(newValue) => setDate(newValue)}
                  renderInput={(params) => <TextField {...params} helperText={null} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth type="number" min="0" id="price" label="Ride Price" name="price" />
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
