import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@material-ui/core';

function UserContacted({ user }) {
  return (
    <ListItem button>
      <ListItemIcon>
        <Avatar alt={user.senderName} src="" />
      </ListItemIcon>
      <ListItemText primary={user.senderName}>{user.senderName}</ListItemText>
    </ListItem>
  );
}

export default UserContacted;
