import React, { useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import DetailsIcon from '@mui/icons-material/Sms';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Main() {
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

  const styles = {
    width: '380px',
    minWidth: '380px',
    fontsize: '18px',
    margin: 'auto',
    paddingTop: '300px',
  };

  return (
    <div className="search-page" style={styles}>
      {showRides ? (
        <div>
          <Button
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

          {rides.map((ride) => (
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
              key={ride.date + ride.driverId}
            >
              <ListItem
                alignItems="flex-start"
                secondaryAction={(
                  <IconButton>
                    <DetailsIcon />
                  </IconButton>
                  )}
              >
                <ListItemText
                  primary={
                    (
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {ride.origin}
                        {' '}
                        to:
                        {' '}
                        {ride.destination}
                      </Typography>
                    )
                  }
                  secondary={
                    (
                      <Typography
                        sx={{ display: 'inline' }}
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
  );
}

export default Main;
