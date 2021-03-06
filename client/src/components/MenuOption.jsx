import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthContext } from '../contexts/index.jsx';
import logo from '../assets/logo.webp';
import bg from '../assets/menu1.webp';

function MenuOption() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { logout, currentUser } = useContext(AuthContext);
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
    navigate('/my-profile', { state: { id: currentUser.uid } });
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
    logout();
  };

  const location = useLocation();
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return <div />;
  }
  const menustyle = {
    height: '12vh',
    backgroundImage: `url("${bg}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    justifyContent: 'space-evenly',
  };

  return (
    <nav style={menustyle}>
      <CssBaseline />
      <Typography component="h1" variant="h3">
        <img alt="logo" src={logo} width="90vw" />
      </Typography>
      <Button
        id="basic-button"
        variant="outlined"
        sx={{ background: 'pink', opacity: '.8' }}
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
        <MenuItem onClick={handleHome} sx={{ mb: 0.5 }}>Home</MenuItem>
        <MenuItem onClick={handleProfile} sx={{ mb: 0.5 }}>Profile</MenuItem>
        <MenuItem onClick={handleMessages} sx={{ mb: 0.5 }}>Messages</MenuItem>
        <MenuItem onClick={handleRide} sx={{ mb: 3 }}>Post a Ride</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </nav>
  );
}

export default MenuOption;
