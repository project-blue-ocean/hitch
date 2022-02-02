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
  const [firstName, setFname] = useState('');
  const [lastName, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [dob, setDOB] = useState('');
  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  // Context
  const {
    signup, addProfile, updateProfile, uploadAvatar,
  } = useContext(AuthContext);

  // Methods
  const onChange = (e) => {
    const { id, value } = e.target;
    if (id === 'firstName') setFname(value);
    if (id === 'lastName') setLname(value);
    if (id === 'email') setEmail(value);
    if (id === 'password') setPassword(value);
    if (id === 'passwordConfirmation') setPasswordConfirmation(value);
    if (id === 'dob') setDOB(value);
    if (id === 'bio') setBio(value);
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setAvatar(img);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (password !== passwordConfirmation) {
        return setError('Passwords do not match');
      }
      setLoading(true);
      const userCredential = await signup(email, password);
      const { user } = userCredential;
      const photoURL = await uploadAvatar(user.uid, avatar);
      const name = [firstName, lastName].join(' ');
      const age = new Date().getFullYear() - dob.getFullYear();
      await addProfile({
        userId: user.uid, name, image: { url: photoURL }, age, bio, riderRating: 0, driverRating: 0,
      });
      await updateProfile({ displayName: name, photoURL });
      await navigate('/login');
    } catch (err) {
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
          console.error(err.code, err.message);
          setError(err.message);
          break;
      }
    } finally {
      setLoading(false);
    }
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
                name="bio"
                id="bio"
                fullWidth
                label="Bio"
                placeholder="Tell us about yourself!"
                multiline
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <>
                <input
                  accept="image/*"
                  type="file"
                  id="select-image"
                  style={{ display: 'none' }}
                  onChange={onImageChange}
                />
                <label htmlFor="select-image">
                  <Button variant="contained" color="primary" component="span">
                    Upload Avatar
                  </Button>
                </label>
              </>
            </Grid>
            <Grid item xs={12} sm={6}>
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
