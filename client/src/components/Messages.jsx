import React, { useState, useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Paper,
  Divider,
  TextField,
  List,
  Fab,
} from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import Message from './Message.jsx';
import UserContacted from './UserContacted.jsx';
import { AuthContext } from '../contexts/index.jsx';
import dummyData from '../../../messagesDummyData';

function Messages() {
  const [usersContacted, setUsersContacted] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userContactedId, setUserContactedId] = useState(null);
  const {
    currentUser,
    addMessage,
    getMessages,
    getProfile,
    updateUsersContacted,
  } = useContext(AuthContext);
  const didMounted = useRef(false);
  const location = useLocation();
  const profile = location.state;

  useEffect(() => {
    console.log('Calling', didMounted.current);
    if (didMounted.current) {
      if (profile) {
        let userAlreadyContacted = false;
        console.log("ContactedInner", usersContacted);
        for (let i = 0; i < usersContacted.length; i += 1) {
          if (usersContacted[i].userId === profile.userId) {
            userAlreadyContacted = true;
            break;
          }
        }
        if (!userAlreadyContacted) {
          console.log('called');
          const newUser = { name: profile.name, userId: profile.userId, image: profile.image.url };
          updateUsersContacted(currentUser.uid, newUser)
            .then(result => {
              setUsersContacted(usersContacted => [...usersContacted, newUser]);
              console.log('Inserted');
            })
            .catch(err => console.log(err));
        }
      }
    } else {
      didMounted.current = true;
      if (profile) {
        setUserContactedId(profile.userId);
      }
      getProfile(currentUser.uid)
        .then(result => {
          let userProfile = result.data();
          console.log('DidMount Profile', userProfile);
          setUsersContacted(userProfile.usersContacted);
        });
    }
  }, [usersContacted]);

  useEffect(() => {
    if (userContactedId !== null) {
      getMessages(userContactedId + currentUser.uid, (updatedMessages) => {
        setMessages(updatedMessages);
      });
    }
  }, [userContactedId]);

  const sendMessage = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const messageToSend = {
      message: data.get('message'),
      senderId: currentUser.uid,
      chatd: [userContactedId + currentUser.uid, currentUser.uid + userContactedId],
      time: new Date(),
    };
    addMessage(messageToSend)
      .catch((err) => console.log(err));
  };

  const messagesEndRef = useRef();

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };

  useEffect(() => {
    if (userContactedId !== null && messages.length > 0) {
      scrollToBottom();
    }
  }, [userContactedId]);

  const userContactedOnClick = (id) => {
    setUserContactedId(id);
  };
  console.log('Contacted', usersContacted);
  console.log('UserContactedId', userContactedId);

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
              <Message message={message} userId={currentUser.uid} />
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

export default Messages;
