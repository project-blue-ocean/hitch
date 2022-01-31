import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  ListItem,
  ListItemText,
} from '@material-ui/core';

function Message({ message, userId }) {
  const alignOption = message.senderId === userId ? 'right' : 'left';
  return (
    <ListItem>
      <Grid container>
        <Grid item xs={12}>
          <ListItemText align={alignOption} primary={message.msg} />
        </Grid>
        <Grid item xs={12}>
          <ListItemText align={alignOption} secondary={message.time} />
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default Message;
