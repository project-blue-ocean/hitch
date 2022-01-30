import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
      <div>
        {usersContacted.map((user) => <div>{user.senderName}</div>)}
      </div>
      <div>
        {messages.map((message) => <div>{message.msg}</div>)}
      </div>
    </div>
  );
}

Messages.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default Messages;
