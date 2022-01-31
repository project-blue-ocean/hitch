import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthContext } from '../contexts/index.jsx';

function MenuOption() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleHome = () => {
    setAnchorEl(null);
    navigate('/');
  };
  const handleProfile = () => {
    setAnchorEl(null);
    navigate('/my-profile');
  };
  const handleMessages = () => {
    setAnchorEl(null);
    navigate('/messages');
  };
  const handleRide = () => {
    setAnchorEl(null);
    navigate('/post-ride');
  };
  const handleLogout = () => {
    setAnchorEl(null);
    navigate('/login');
    const { logout } = useContext(AuthContext);
    logout();
  };
  return (
    <nav>
      <CssBaseline />
      <Typography component="h1" variant="h3">
        Logo
      </Typography>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleHome} sx={{ mb: 0.5}}>Home</MenuItem>
        <MenuItem onClick={handleProfile} sx={{ mb: 0.5 }}>Profile</MenuItem>
        <MenuItem onClick={handleMessages} sx={{ mb: 0.5 }}>Messages</MenuItem>
        <MenuItem onClick={handleRide} sx={{ mb: 3 }}>Post a Ride</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </nav>
  );
}

export default MenuOption;
