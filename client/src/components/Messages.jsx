import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Paper,
  Divider,
  TextField,
  List,
  Fab,
} from '@material-ui/core';
import Message from './Message.jsx';
import UserContacted from './UserContacted.jsx';
import dummyData from '../../../messagesDummyData';

function Messages({ userId }) {
  const [usersContacted, setUsersContacted] = useState(dummyData.usersContacted);
  const [messages, setMessages] = useState(dummyData.messages);
  const [userContactedId, setUserContactedId] = useState(null);

  // const getUsersContacted = () => {
  //   return false;
  // };

  // const getMessages = (userContactedId) => {
  //   return false;
  // };

  const userContactedOnClick = (id) => {
    setUserContactedId(id);
  };

  return (
    <div>
      <Grid container component={Paper}>
        <Grid item xs={3} style={{ borderRight: '1px solid #e0e0e0' }}>
          <List>
            {usersContacted.map((user) => (
              <UserContacted user={user} userContactedOnClick={userContactedOnClick} />
            ))}
          </List>
        </Grid>
        {userContactedId
        && (
        <Grid item xs={9}>
          <List>
            {messages.map((message) => (
              <Message message={message} userId={userId} />
            ))}
          </List>
          <Divider />
          <Grid container style={{ padding: '20px' }}>
            <Grid item xs={11}>
              <TextField id="outlined-basic-email" fullWidth />
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="primary" aria-label="add">Send</Fab>
            </Grid>
          </Grid>
        </Grid>
        )}
      </Grid>
    </div>
  );
}

Messages.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default Messages;
