/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { Link, Redirect } from 'react-router-dom';
import { useLazyQuery, gql } from '@apollo/client';
import { useAuth } from '../../contexts/AuthContent';
import logo from '../Reusable/groupster_border.svg';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const GET_USER = gql`
  query getProfile($email: String!) {
    getProfile(email: $email) {
      id
      email
      username
      name
      age
    }
  }
`;

const Signup = (props) => {
  const [password, setPassword] = useState('');
  const [userEmail, setEmail] = useState('');
  const [person, setPerson] = useState();
  const { login } = useAuth();
  const classes = useStyles();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState([]);
  const [getUser, { data }] = useLazyQuery(GET_USER, {
    variables: {
      email: userEmail,
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(userEmail, password);
      getUser({
        variables: {
          email: userEmail.toLowerCase(),
        },
      });
      setLoggedIn(<Redirect to="/explore" />);
    } catch (err) {
      console.log(err);
      setError('Failed to login');
    }
    return setLoading(false);
  };

  useEffect(() => {
    if (data) {
      setPerson(data.getProfile[0]);
    }
  }, [data]);

  return (
    <div style={{ height: '100vh' }}>
      <img
        src={logo}
        alt="Groupster Logo"
        style={{
          // borderRadius: '20px',
          // border: '3px solid #7e6ecb',
          maxWidth: '350px',
          height: '80px',
          alignSelf: 'center',
          marginTop: '3vh',
          marginBottom: '15px',
        }}
      />
      {loggedIn}
      <Container component="main" maxWidth="xs" className="loginContainer">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          {error && (
            <Alert style={{ marginTop: '1vh' }} severity="error">
              {error}
            </Alert>
          )}
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={userEmail}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              disabled={loading}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Start Learning
            </Button>
          </form>
        </div>
        <div className="w-100 text-center mt-2">
          {'Need an account?\t'}
          <Link to="/signup">Signup</Link>
        </div>
      </Container>
    </div>
  );
};

export default Signup;
