import React, { useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
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
import van from '../assets/van1.png';

function Main() {
  const [profile, setProfile] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [rides, setRides] = useState([]);
  const [showRides, setShowRides] = useState(false);
  const [searchTerm, setSearchTerm] = useState({
    source: '',
    destination: '',
  });

  const updateSearch = (e) => {
    const { value } = e.target;
    const name = e.target.getAttribute('name');
    if (name === 'From') {
      setSearchTerm({ ...searchTerm, source: value.toLowerCase() });
    } else if (name === 'Destination') {
      setSearchTerm({ ...searchTerm, destination: value.toLowerCase() });
    }
  };

  const searchRides = async (e) => {
    e.preventDefault();
    const response = await axios.get('/rides', { params: { search: searchTerm } });
    const { data } = await response;
    setRides(data);
    if (data.length > 0) {
      setShowRides(true);
    }
  };

  const getProfile = async (id) => {
    const response = await axios.get('/profile', { params: { search: id } });
    const { data } = await response;
    setProfile(data);
  };

  const displayModal = (id) => {
    getProfile(id);
    setShowDetails(true);
  };

  const closeModal = () => {
    setShowDetails(false);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #4169E1',
    boxShadow: 24,
    p: 4,
    borderRadius: '6px',
  };

  const styles = {
    width: '50%',
    minWidth: '380px',
    margin: 'auto',
    paddingTop: '150px',
  };

  const mainStyle = {
    height: '100vh',
    backgroundImage: `url("${van}")`,
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
        <h1> Hitch(not a dating app)</h1>
        <div className="search-box" style={styles}>
          {showRides ? (
            <div className="search-container" style={{ width: '100%' }}>
              <Button
                sx={{ width: '50%' }}
                variant="outlined"
                type="submit"
                onClick={() => {
                  setShowRides(false);
                  setSearchTerm({
                    source: '',
                    destination: '',
                  });
                }}
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
                              {ride.origin}
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
              onSubmit={searchRides}
            >
              <TextField
                id="outlined-basic"
                label="Ride From"
                varient="Ride From"
                type="text"
                name="From"
                onChange={updateSearch}
                autoFocus
              />
              <TextField
                id="outlined-basic"
                label="Destination"
                varient="Destination"
                type="text"
                name="Destination"
                onChange={updateSearch}
              />
              <Button variant="outlined" type="submit" onClick={searchRides}>
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
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div>
                <Avatar alt={profile.name} src={profile.image} />
                {profile.name}
              </div>
              <Rating name="rating" value={Number(profile.driverRating)} readOnly precision={0.5} />
              <div>message</div>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Main;
