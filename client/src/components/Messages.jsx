import React, { useState, useEffect, useContext } from 'react';
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
import { AuthContext } from '../contexts/index.jsx';
import dummyData from '../../../messagesDummyData';

function Messages({ userId }) {
  const [usersContacted, setUsersContacted] = useState(dummyData.usersContacted);
  const [messages, setMessages] = useState(dummyData.messages);
  const [userContactedId, setUserContactedId] = useState(null);
  const { currentUser, addMessage, getMessages } = useContext(AuthContext);

  // const getUsersContacted = () => {
  //   return false;
  // };

  useEffect(() => {
    // getMessages({senderId: userContactedId, recieverId: currentUser.uid })
    if (userContactedId !== null) {

      getMessages({ senderId: 1, receiverId: 2 })
        .then((allMessages) => {
          console.log('all messages', allMessages);
    })
        .catch((err) => err);
  }
    }, []);




  const sendMessage = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const messageToSend = {
      message: data.get('message'),
    };
    addMessage(messageToSend)
      .then((message) => {
        console.log(message);
      })
      .catch((err) => console.log(err));
  };

  const messagesEndRef = React.useRef();

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };

  useEffect(() => {
    if (userContactedId !== null) {
      scrollToBottom();
    }
  }, [userContactedId]);

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
          <List style={{ height: '70vh', overflowY: 'auto' }}>
            {messages.map((message) => (
              <Message message={message} userId={userId} />
            ))}
            <div ref={messagesEndRef} />
          </List>
          <Divider />
          <Grid container component="form" onSubmit={sendMessage} style={{ padding: '20px' }}>
            <Grid item xs={11}>
              <TextField id="message" name="message" autoComplete="off" required fullWidth />
            </Grid>
            <Grid xs={1} align="right">
              <Fab type="submit" color="primary" aria-label="add">Send</Fab>
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