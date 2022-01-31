import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@material-ui/core';

function UserContacted({ user, userContactedOnClick }) {
  return (
    <ListItem button onClick={() => userContactedOnClick(user.id)}>
      <ListItemIcon>
        <Avatar alt={user.senderName} src="" />
      </ListItemIcon>
      <ListItemText primary={user.senderName}>{user.senderName}</ListItemText>
    </ListItem>
  );
}

export default UserContacted;
