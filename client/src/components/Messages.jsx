import React, {
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react';
import {
  Grid,
  Paper,
  Divider,
  TextField,
  List,
  Fab,
  Container,
  Box,
} from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import Message from './Message.jsx';
import UserContacted from './UserContacted.jsx';
import { AuthContext } from '../contexts/index.jsx';

function Messages() {
  const [usersContacted, setUsersContacted] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userContactedId, setUserContactedId] = useState(null);
  const [message, setMessage] = useState('');
  const {
    currentUser,
    addMessage,
    getMessages,
    getProfile,
    updateUsersContacted,
  } = useContext(AuthContext);
  const didMount = useRef(false);
  const AddedprofileToUsersContacted = useRef(false);
  const messagesEndRef = useRef();
  const location = useLocation();
  const profile = location.state;

  useEffect(() => {
    if (didMount.current && !AddedprofileToUsersContacted.current && profile) {
      let userAlreadyContacted = false;
      for (let i = 0; i < usersContacted.length; i += 1) {
        if (usersContacted[i].userId === profile.userId) {
          userAlreadyContacted = true;
          break;
        }
      }
      if (!userAlreadyContacted) {
        const newContact = {
          name: profile.name, userId: profile.userId, image: profile.image.url,
        };
        updateUsersContacted(currentUser.uid, newContact)
          .then(() => {
            const userContact = {
              name: currentUser.displayName, userId: currentUser.uid, image: currentUser.photoURL,
            };
            updateUsersContacted(newContact.userId, userContact)
              .then(() => {
                AddedprofileToUsersContacted.current = true;
                setUsersContacted(usersContacted => [...usersContacted, newContact]);
              });
          })
          .catch((err) => console.log(err));
      }
    }
  }, [usersContacted]);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      if (profile) {
        setUserContactedId(profile.userId);
      }
      getProfile(currentUser.uid)
        .then((result) => {
          const { usersContacted } = result.data();
          if (usersContacted === undefined) {
            setUsersContacted([]);
          } else {
            setUsersContacted(usersContacted);
          }
        });
    }
  }, []);

  useEffect(() => {
    if (userContactedId !== null) {
      const unsubscribe = getMessages(userContactedId + currentUser.uid, (updatedMessages) => {
        setMessages(updatedMessages);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [userContactedId]);

  const sendMessage = (event) => {
    event.preventDefault();
    const messageToSend = {
      message: message,
      senderId: currentUser.uid,
      chatd: [userContactedId + currentUser.uid, currentUser.uid + userContactedId],
      time: new Date(),
    };
    addMessage(messageToSend)
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
      setMessage('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };

  useEffect(() => {
    if (userContactedId !== null && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const userContactedOnClick = (id) => {
    setUserContactedId(id);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        <Grid container component={Paper} style={{ width: '100%' }}>
          <Grid item xs={3} style={{ borderRight: '1px solid #e0e0e0' }}>
            <List>
              {usersContacted.map((user) => (
                <UserContacted
                  user={user}
                  key={user.userId}
                  userContactedOnClick={userContactedOnClick}
                />
              ))}
            </List>
          </Grid>
          {userContactedId
          && (
          <Grid item xs={9}>
            <List style={{ height: '70vh', overflowY: 'auto' }}>
              {messages.map((message, index) => (
                <Message message={message} key={index.toString()} userId={currentUser.uid} />
              ))}
              <div ref={messagesEndRef} />
            </List>
            <Divider />
            <Grid container component="form" onSubmit={sendMessage} style={{ padding: '10px'}}>
              <Grid item xs={10}>
                <TextField
                  id="message"
                  name="message"
                  autoComplete="off"
                  value={message}
                  onChange={(e) => { setMessage(e.target.value); }}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={2} align="right">
                <Fab type="submit" color="primary" aria-label="add">Send</Fab>
              </Grid>
            </Grid>
          </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

export default Messages;
