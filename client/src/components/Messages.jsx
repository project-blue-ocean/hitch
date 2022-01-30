import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Paper,
  Divider,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Fab,
} from '@material-ui/core';
import Button from '@mui/material/Button';
import Message from './Message.jsx';
import dummyData from '../../../messagesDummyData';

function Messages({userId}) {
  const [usersContacted, setUsersContacted] = useState(dummyData.usersContacted);
  const [messages, setMessages] = useState(dummyData.messages);

  // const getUsersContacted = () => {
  //   return false;
  // };

  // const getMessages = (userContactedId) => {
  //   return false;
  // };

  return (
    <div>
      <Grid container component={Paper}>
        <Grid item xs={3}>
          <List>
            {usersContacted.map((user) => (
              <ListItem button>
                <ListItemIcon>
                  <Avatar alt={user.senderName} src="" />
                </ListItemIcon>
                <ListItemText primary={user.senderName}>{user.senderName}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Divider />
        <Grid item xs={9}>
          <List>
            {messages.map((message) => (
              <ListItem>
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText align="right" primary={message.msg} />
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText align="right" secondary={message.time} />
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Grid container style={{padding: '20px'}}>
            <Grid item xs={11}>
              <TextField id="outlined-basic-email" label="Type Something" fullWidth />
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="primary" aria-label="add">Send</Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

// Messages.propTypes = {
//   userId: PropTypes.number.isRequired,
// };

export default Messages;
