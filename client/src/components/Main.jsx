import React, { useState, useContext } from 'react';
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
import van from '../assets/van1.png';
import { AuthContext } from '../contexts/index.jsx';

function Main() {
  const { getRides, getProfile } = useContext(AuthContext);

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
      setSearchTerm({ ...searchTerm, source: value });
    } else if (name === 'Destination') {
      setSearchTerm({ ...searchTerm, destination: value });
    }
  };

  const searchRides = async (e) => {
    e.preventDefault();
    const data = await getRides(searchTerm.source);
    setRides(data);
    if (data.length > 0) setShowRides(true);
  };

  const getUserProfile = (id) => {
    getProfile(id)
      .then((userProfile) => {
        setProfile(userProfile.data());
      })
      .catch((err) => err);
  };

  const displayModal = (id) => {
    getUserProfile(id);
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
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
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
                variant="contained"
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
              onSubmit={searchRides}
            >
              <TextField
                sx={{ background: 'white', opacity: '.9', borderRadius: '6px' }}
                id="filled-basic"
                label="Location"
                varient="filled"
                type="text"
                name="From"
                onChange={updateSearch}
                autoFocus
              />
              <TextField
                sx={{ background: 'white', opacity: '.9', borderRadius: '6px' }}
                id="filled-basic"
                label="Destination"
                varient="filled"
                type="text"
                name="Destination"
                onChange={updateSearch}
              />
              <Button variant="contained" type="submit" onClick={searchRides}>
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
                <Link to="/my-profile" state={{ id: profile.userId }}>
                  {profile.name}
                </Link>
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
