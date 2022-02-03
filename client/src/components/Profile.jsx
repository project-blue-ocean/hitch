import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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

function Profile() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({});
  const [reviews, setReviews] = useState([]);
  const [driverRating, setDriverRating] = useState(0);
  const [riderRating, setRiderRating] = useState(0);

  const { getProfile, currentUser, getReviews } = useContext(AuthContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    const userId = id || currentUser.uid;
    getProfile(userId)
      .then((userProfile) => {
        setProfile(userProfile.data());
      })
      .catch((err) => err);
  }, []);

  useEffect(() => {
    getReviews(id)
      .then((userReviews) => {
        setReviews(userReviews);
        let driver = 0;
        let driverCount = 0;
        let rider = 0;
        let riderCount = 0;
        userReviews.forEach((review) => {
          if (review.driver === 'on') {
            driver += parseInt(review.starRating);
            driverCount += 1;
          } else {
            rider += parseInt(review.starRating);
            riderCount += 1;
          }
        });
        let driverAverage = Math.round(((driver / driverCount) + Number.EPSILON) * 100) / 100;
        let riderAverage = Math.round(((rider / riderCount) + Number.EPSILON) * 100) / 100;
        if (isNaN(driverAverage)) driverAverage = 0;
        if (isNaN(riderAverage)) riderAverage = 0;
        setDriverRating(driverAverage);
        setRiderRating(riderAverage);
      })
      .catch((err) => err);
  }, []);

  const profileImage = profile && profile.image ? profile.image.url : null;
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
          backgroundImage: `url(${profileImage})`,
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
        <Button variant="outlined" sx={{ flexGrow: 1, mt: 3 }}>
          <Link to="/messages" state={profile} style={{ textDecoration: 'none' }}>
            Message
          </Link>
        </Button>
        <Button variant="outlined" onClick={handleOpen} sx={{ flexGrow: 1, mt: 1 }}>
          Write a Review
        </Button>
        <ReviewModal handleClose={handleClose} open={open} prof={profile} />
        <Box sx={{ flexGrow: 1, mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography component="legend">
                Rider
                {' '}
                {riderRating}
              </Typography>
              <Rating name="rider" value={riderRating} readOnly precision={0.5} />
            </Grid>
            <Grid item xs={6}>
              <Typography component="legend">
                Driver
                {' '}
                {driverRating}
              </Typography>
              <Rating name="driver" value={driverRating} readOnly precision={0.5} />
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
