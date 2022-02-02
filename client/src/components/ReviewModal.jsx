import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';

import { AuthContext } from '../contexts/index.jsx';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ReviewModal({ handleClose, open, prof }) {
  const { addReview } = useContext(AuthContext);
  const [value, setValue] = useState(0);
  const { userId } = prof;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const feedback = data.get('feedback');
    const rating = data.get('half-rating');
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const driverStatus = data.get('wasDriver');
    const rideDate = new Date();

    const review = {
      starRating: rating,
      driver: driverStatus,
      date: rideDate,
      message: feedback,
      receiverId: userId,
      name: `${firstName} ${lastName}`,
    };
    addReview(review);
    handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Your review of
          {' '}
          {prof.name}
        </Typography>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          <div>
            {' '}
            Was
            {' '}
            {prof.name}
            {' '}
            the rider or the driver?
          </div>
          <FormGroup aria-label="position" row required>
            <FormControlLabel control={<Checkbox name="wasRider" />} label="Rider" labelPlacement="top" />
            <FormControlLabel control={<Checkbox name="wasDriver" />} label="Driver" labelPlacement="top" />
          </FormGroup>
          <Rating
            name="half-rating"
            precision={0.5}
            size="large"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            required
          />
          <TextField
            id="outlined-multiline-static"
            label="Your feedback (optional)"
            name="feedback"
            multiline
            rows={4}
            fullWidth
            defaultValue=""
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

