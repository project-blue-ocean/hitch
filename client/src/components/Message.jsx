import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import Moment from 'moment';

function Message({ message, userId }) {
  const alignOption = message.senderId === userId ? 'right' : 'left';
  return (
    <ListItem>
      <Grid container>
        <Grid item xs={12}>
          <ListItemText align={alignOption} primary={message.msg} />
        </Grid>
        <Grid item xs={12}>
          <ListItemText align={alignOption} secondary={Moment(message.time).format('lll')} />
        </Grid>
      </Grid>
    </ListItem>
  );
}

Message.propTypes = {
  userId: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired,
};

export default Message;
