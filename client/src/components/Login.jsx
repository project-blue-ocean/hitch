import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@material-ui/core/Alert';
import { AuthContext } from '../contexts/index.jsx';

function Login() {
  const navigate = useNavigate();
  // State
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  // Context
  const { login } = useContext(AuthContext);

  // Methods
  const onChange = (e) => {
    const { id, value } = e.target;
    if (id === 'email') setEmail(value);
    if (id === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password)
        .then((userCredential) => {
          const { user } = userCredential;
          console.log('user cred', userCredential);
          // TODO: add userId to context
        })
        .catch((err) => {
          switch (err.code) {
            case 'auth/wrong-password':
              setError('Incorrect password.');
              break;
            case 'auth/invalid-email':
              setError(`Email address ${email} is invalid.`);
              break;
            case 'auth/user-not-found':
              setError('User not found.');
              break;
            case 'auth/too-many-requests':
              setError('Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.');
              break;
            default:
              console.error(err.code, err.message);
              setError(err.message);
              break;
          }
        });
    } catch {
      return setError('Failed to login');
    }
    setLoading(false);
    navigate('/'); // redirect where you would like
  };
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && <Alert severity="warning">{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={onChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
            />
            <Button
              type="submit"
              disabled={isLoading}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid item>
              <Link to="/signup">
                Sign Up
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
