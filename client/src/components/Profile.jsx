import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Rating from '@mui/material/Rating';
import Carousel from 'react-material-ui-carousel';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { AuthContext } from '../contexts/index.jsx';
import ReviewModal from './ReviewModal.jsx';
import ReviewCard from './ReviewCard.jsx';
import { reviews } from './profileDummy.js';

function Profile() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({});
  const { getProfile } = useContext(AuthContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    if (id) {
      getProfile(id)
        .then((userProfile) => {
          setProfile(userProfile.data());
        })
        .catch((err) => err);
    } else {
      getProfile('h5WyNDhKFC6mDuOH5UVu')
        .then((userProfile) => {
          setProfile(userProfile.data());
        })
        .catch((err) => err);
    }
  }, []);

  const handleMessage = () => {
    const { userId } = profile;
    navigate('/messages', { userId });
  };

  return (
    <Container component="main" maxWidth="auto">
      <CssBaseline />
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
      >
        <Box sx={{
          mt: 10,
          mb: 2,
          width: 250,
          height: 250,
          borderRadius: 1,
          backgroundImage: `url(${profile.url})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        />
        <Typography component="h1" variant="h5">
          {profile.name}
          {' '}
          (
          {profile.age}
          )
        </Typography>
        <Box sx={{ width: 425, textAlign: 'center' }}>
          <Typography>
            {profile.bio}
          </Typography>
        </Box>
        <Button variant="outlined" onClick={handleMessage} sx={{ flexGrow: 1, mt: 3 }}>Message</Button>
        <Button variant="outlined" onClick={handleOpen} sx={{ flexGrow: 1, mt: 1 }}>
          Write a Review
        </Button>
        <ReviewModal handleClose={handleClose} open={open} profile={profile} />
        <Box sx={{ flexGrow: 1, mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography component="legend">
                Rider
                {' '}
                {profile.riderRating}
              </Typography>
              <Rating name="rider" value={parseInt(profile.riderRating)} readOnly precision={0.5} />
            </Grid>
            <Grid item xs={6}>
              <Typography component="legend">
                Driver
                {' '}
                {profile.driverRating}
              </Typography>
              <Rating name="driver" value={parseInt(profile.driverRating)} readOnly precision={0.5} />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 2, width: 345 }}>
          <Carousel
            NextIcon={<NavigateNextIcon />}
            PrevIcon={<NavigateBeforeIcon />}
          >
            {reviews.map((review, i) => (<ReviewCard key={i} review={review} />))}
          </Carousel>
        </Box>
      </Grid>
    </Container>
  );
}

export default Profile;
