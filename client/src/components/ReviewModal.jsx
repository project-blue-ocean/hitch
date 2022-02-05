import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
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
  const {
    addReview, setToastShowing, setToastMessage, setToastType, currentUser,
  } = useContext(AuthContext);
  const [value, setValue] = useState(0);
  const { userId } = prof;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const feedback = data.get('feedback');
    const rating = data.get('half-rating');
    const driverStatus = data.get('wasDriver');
    const rideDate = new Date();
    const review = {
      starRating: rating,
      driver: driverStatus,
      date: rideDate,
      message: feedback,
      receiverId: userId,
      name: currentUser.displayName,
    };

    addReview(review);
    setToastType('success');
    setToastMessage('Your review was posted');
    setToastShowing(true);
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
          <FormLabel id="rider-driver-radio-buttons-group">
            {`Was ${prof.name} the rider or driver?`}
          </FormLabel>
          <RadioGroup
            aria-labelledby="rider-driver-radio-buttons-group"
            defaultValue="on"
            name="wasDriver"
          >
            <FormControlLabel value="on" control={<Radio />} label="Driver" />
            <FormControlLabel value="off" control={<Radio />} label="Rider" />
          </RadioGroup>
          <FormLabel id="star-rating">
            {`Was ${prof.name} the rider or driver?`}
          </FormLabel>
          <Rating
            aria-labelledby="star-rating"
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
}
