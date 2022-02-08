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
  Button,
} from '@material-ui/core';
import { useLocation, Link } from 'react-router-dom';
import Message from './Message.jsx';
import UserContacted from './UserContacted.jsx';
import { AuthContext } from '../contexts/index.jsx';

function Messages() {
  const [usersContacted, setUsersContacted] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userContactedId, setUserContactedId] = useState(null);
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const {
    currentUser,
    addMessage,
    getMessages,
    getProfile,
    updateUsersContacted,
    setToastShowing,
    setToastMessage,
    setToastType,
  } = useContext(AuthContext);
  const didMount = useRef(false);
  const AddedprofileToUsersContacted = useRef(false);
  const messagesEndRef = useRef();
  const location = useLocation();
  const profile = location.state;

  // component did update - usersContacted
  useEffect(() => {
    // if user is trying to message a specif person (came to messages from a ride post),
    // check if user messaged that person before by checking their profile against list of
    // usersContacted
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
                setUsersContacted((usersContactedPrior) => [...usersContactedPrior, newContact]);
              });
          })
          .catch(() => {
            setToastType('error');
            setToastMessage('An error occurred while loading messages');
            setToastShowing(true);
          });
      }
    }
  }, [usersContacted]);

  // component did mount - get list of usersContacted from database
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      if (profile) {
        setUserContactedId(profile.userId);
      }
      getProfile(currentUser.uid)
        .then((result) => {
          // eslint-disable-next-line no-shadow
          const { usersContacted } = result.data();
          if (usersContacted === undefined) {
            setUsersContacted([]);
          } else {
            setUsersContacted(usersContacted);
          }
        });
    }
  }, []);

  // component did update - userContactedId
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (userContactedId !== null) {
      const unsubscribe = getMessages(userContactedId + currentUser.uid, (updatedMessages) => {
        setMessages(updatedMessages);
      });
      return () => {
        // stop firestore for listening for messages between users
        unsubscribe();
      };
    }
  }, [userContactedId]);

  const sendMessage = (event) => {
    event.preventDefault();
    const messageToSend = {
      message,
      senderId: currentUser.uid,
      chatd: [userContactedId + currentUser.uid, currentUser.uid + userContactedId],
    };
    addMessage(messageToSend)
      .catch(() => {
        setToastType('error');
        setToastMessage('An error occurred while loading messages');
        setToastShowing(true);
      });
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

  const userContactedOnClick = (userClicked) => {
    setUserContactedId(userClicked.userId);
    setUserName(userClicked.name);
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
            <List style={{ height: '70vh', overflowY: 'auto' }}>
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
              {messages.map((currentMessage, index) => (
                <Message message={currentMessage} key={index.toString()} userId={currentUser.uid} />
              ))}
              <Link to="/my-profile" state={{ id: userContactedId }} style={{ textDecoration: 'none' }}>
                <Button ref={messagesEndRef}>{`Go to ${userName} profile`}</Button>
              </Link>
            </List>
            <Divider />
            <Grid container component="form" onSubmit={sendMessage} style={{ padding: '10px' }}>
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
