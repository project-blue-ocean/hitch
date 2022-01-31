import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  ListItem,
  ListItemText,
} from '@material-ui/core';

function Message({ message }) {
  return (
    <ListItem>
      <Grid container>
        <Grid item xs={12}>
          <ListItemText align="right" primary={message.msg} />
        </Grid>
        <Grid item xs={12}>
          <ListItemText align="right" secondary={message.time} />
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default Message;
