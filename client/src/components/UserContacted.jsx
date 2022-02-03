import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@material-ui/core';

function UserContacted({ user, userContactedOnClick }) {
  const imageToRender = user.image ? user.image : '';
  return (
    <ListItem button onClick={() => userContactedOnClick(user.userId)}>
      <ListItemIcon>
        <Avatar alt={user.senderName} src={imageToRender} />
      </ListItemIcon>
      <ListItemText primary={user.senderName}>{user.name}</ListItemText>
    </ListItem>
  );
}

UserContacted.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  userContactedOnClick: PropTypes.func.isRequired,
};

export default UserContacted;
