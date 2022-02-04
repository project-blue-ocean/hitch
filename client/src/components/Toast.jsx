import React, { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@material-ui/core/Alert';
import { AuthContext } from '../contexts/index.jsx';

function Toast() {
  const {
    setToastShowing, toastShowing, toastMessage, toastType,
  } = useContext(AuthContext);
  return (
    <Snackbar
      open={toastShowing}
      onClose={() => { setToastShowing(false); }}
      autoHideDuration={6000}
    >
      <Alert severity={toastType}>{toastMessage}</Alert>
    </Snackbar>
  );
}

export default Toast;
