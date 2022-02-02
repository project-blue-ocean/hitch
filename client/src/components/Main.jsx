import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import DetailsIcon from '@mui/icons-material/Sms';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Modal from '@mui/material/Modal';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import Map from './Map.jsx';
import van from '../assets/van1.png';
import { AuthContext } from '../contexts/index.jsx';

function Main() {
  const { getRides, getProfile } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [rides, setRides] = useState([]);
  const [showRides, setShowRides] = useState(false);
  const [showMap, setMap] = useState(false);
  const [profilepic, setprofilepic] = useState('');
  const [location, setLocation] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [startCoords, setStart] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [endCoords, setEnd] = useState({
    longitude: 0,
    latitude: 0,
  });

  const getCoordinates = async (from, destination) => {
    if (from !== '' && destination === '') {
      const sourceResponse = await axios.get('/coords', { params: { location: from } });
      await setStart({
        longitude: sourceResponse.data.features[0].bbox[0],
        latitude: sourceResponse.data.features[0].bbox[1],
      });
      setEnd({ longitude: 0, latitude: 0 });
    }
    if (destination !== '' && from === '') {
      const endResponse = await axios.get('/coords', { params: { location: destination } });
      await setEnd({
        longitude: endResponse.data.features[0].bbox[0],
        latitude: endResponse.data.features[0].bbox[1],
      });
      setStart({ longitude: 0, latitude: 0 });
    }
    if (destination !== '' && from !== '') {
      const sourceResponse = await axios.get('/coords', { params: { location: from } });
      await setStart({
        longitude: sourceResponse.data.features[0].bbox[0],
        latitude: sourceResponse.data.features[0].bbox[1],
      });
      const endResponse = await axios.get('/coords', { params: { location: destination } });
      await setEnd({
        longitude: endResponse.data.features[0].bbox[0],
        latitude: endResponse.data.features[0].bbox[1],
      });
    }
  };

  const searchRides = async (from) => {
    const data = await getRides(from);
    setRides(data);
    if (data.length > 0) setShowRides(true);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const from = formData.get('From');
    const destination = formData.get('Destination');
    searchRides(from, destination);
    getCoordinates(from, destination);
  };

  const getUserProfile = async (id) => {
    getProfile(id)
      .then((userProfile) => {
        setProfile(userProfile.data());
        setprofilepic(userProfile.data().image.url);
      })
      .catch((err) => err);
  };

  const displayModal = async (id) => {
    await getUserProfile(id);
    setShowDetails(true);
  };

  const closeModal = () => {
    setShowDetails(false);
  };

  async function showPosition(position) {
    await setLocation({ longitude: position.coords.longitude, latitude: position.coords.latitude });
    setMap(true);
  }

  async function getLocation() {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  const modalStyle = {
    display: 'grid',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    height: '50vh',
    bgcolor: 'background.paper',
    border: '2px solid #4169E1',
    boxShadow: 24,
    p: 4,
    borderRadius: '6px',
  };

  const styles = {
    width: '50%',
    minWidth: '50vw',
    margin: 'auto',
    paddingTop: '50px',
  };

  const mainStyle = {
    height: '100vh',
    backgroundImage: `url("${van}")`,
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    justifyContent: 'center',
  };

  return (
    <div className="bg" style={mainStyle}>
      <div
        className="Title"
        style={{
          margin: 'auto',
          width: '50%',
          textAlign: 'center',
        }}
      >
        {showMap ? (
          <div style={{ paddingTop: '10px' }}>
            <Map location={location} startCoords={startCoords} endCoords={endCoords} />
          </div>
        )
          : (
            <div
              style={{
                width: '70vw',
                height: '50vw',
                maxWidth: '400px',
                maxHeight: '300px',
              }}
            >
              <h1>Hitch</h1>
            </div>
          )}

        <div className="search-box" style={styles}>
          {showRides ? (
            <div className="search-container" style={{ width: '100%' }}>
              <Button
                sx={{ width: '50%' }}
                variant="contained"
                type="submit"
              >
                Change Search
              </Button>
              <div className="rideList" style={{ border: '2px solid #4169E1', borderRadius: '6px', backgroundColor: 'white' }}>
                {rides.map((ride) => (
                  <List
                    sx={{
                      width: '100%',
                      maxWidth: 360,

                      alignItems: 'center',
                      margin: 'auto',

                    }}
                    key={ride.date + ride.driverId}
                  >
                    <ListItem
                      alignItems="flex-start"
                      secondaryAction={(
                        <IconButton
                          type="submit"
                          onClick={() => {
                            displayModal(ride.driverId);
                          }}
                        >
                          <DetailsIcon />
                        </IconButton>
                      )}
                    >
                      <ListItemText
                        primary={
                          (
                            <Typography
                              className="list-text"
                              sx={{ display: 'inline', fontSize: '1.8rem' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {ride.start}
                              {' '}
                              <ArrowForwardIcon />
                              {ride.destination}
                            </Typography>
                          )
                        }
                        secondary={
                          (
                            <Typography
                              className="list-text-price"
                              sx={{
                                display: 'inline',
                                fontSize: '1.3rem',
                                color: '#4169E1',
                                opacity: '.9',
                                fontWeight: 'bold',
                              }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {' '}
                              $
                              {ride.price}
                            </Typography>
                          )
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </List>
                ))}
              </div>
            </div>
          ) : (
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
              onSubmit={submitForm}
            >
              <TextField
                sx={{ background: 'white', opacity: '.9', borderRadius: '6px' }}
                id="filled-basic"
                label="Location"
                varient="filled"
                type="text"
                name="From"
                autoFocus
              />
              <TextField
                sx={{ background: 'white', opacity: '.9', borderRadius: '6px' }}
                id="filled-basic"
                label="Destination"
                varient="filled"
                type="text"
                name="Destination"
              />
              <Button variant="contained" type="submit">
                {' '}
                Go!
                {' '}
              </Button>
            </Box>
          )}
        </div>
        <Modal
          open={showDetails}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Driver Details
            </Typography>
            <Avatar alt="userpic" src={profilepic} />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {' '}
              Driver:
              {profile.name}
              {' '}
              <Rating name="rating" value={Number(profile.driverRating)} readOnly precision={0.5} />
            </Typography>
            <Typography>
              <Link to="/my-profile" state={{ id: profile.userId }} style={{ textDecoration: 'none' }}>
                <Button
                  sx={{ width: '150px' }}
                  variant="contained"
                >
                  Go to Profile
                </Button>
              </Link>
              <Link to="/messages" state={{ id: profile.userId }} style={{ textDecoration: 'none' }}>
                <Button
                  sx={{ width: '150px' }}
                  variant="contained"
                >
                  message
                </Button>
              </Link>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Main;
