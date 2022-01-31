import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@material-ui/core/Alert';
// Authentication context
import { AuthContext } from '../contexts/index.jsx';

function SignUp() {
  const navigate = useNavigate();

  // State
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [dob, setDOB] = useState();

  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  // Context
  const { signup } = useContext(AuthContext);

  // Methods
  const onChange = (e) => {
    const { id, value } = e.target;
    if (id === 'firstName') setFname(value);
    if (id === 'lastName') setLname(value);
    if (id === 'email') setEmail(value);
    if (id === 'password') setPassword(value);
    if (id === 'passwordConfirmation') setPasswordConfirmation(value);
    if (id === 'dob') setDOB(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      return setError('Passwords do not match');
    }
    try {
      setLoading(true);
      await signup(email, password)
        .then((userCredential) => {
          console.log('user cred', userCredential);
          const { user } = userCredential;
          // TODO: add firstName, lastName, dob, and profilePicture to database
          // add userId to context
        })
        .catch((err) => {
          switch (err.code) {
            case 'auth/email-already-in-use':
              setError(`Email address ${email} already in use.`);
              break;
            case 'auth/invalid-email':
              setError(`Email address ${email} is invalid.`);
              break;
            case 'auth/operation-not-allowed':
              setError('Error during sign up.');
              break;
            case 'auth/weak-password':
              setError('Password is not strong enough. Add additional characters including special characters and numbers.');
              break;
            default:
              console.error(err.message);
              setError(err.message);
              break;
          }
        });
    } catch {
      return setError('Failed to create an account');
    }
    setLoading(false);
    navigate('/login'); // redirect where you would like
  };

  // Render
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {error && <Alert severity="warning">{error}</Alert>}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password-confirmation"
                label="Password Confirmation"
                type="password"
                id="passwordConfirmation"
                autoComplete="password-confirmation"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="dob"
                label="Birthday"
                type="date"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onChange}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            disabled={isLoading}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

    </Container>
  );
}

export default SignUp;
