/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

const LoginForm = (props) => {
  const [{ setIsLoggedIn }] = useState(props);
  const [{ setValidUsername }] = useState(props);
  const [{ open }] = useState(props);
  const [{ handleClose }] = useState(props);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
  console.log(props);
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidUsername(username);
    setIsLoggedIn(true);
    handleClose();
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Container component="main" maxWidth="xs" style={{ height: '45vh' }}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="none"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Login
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    {/* <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link> */}
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </Slide>
    </div>
  );
};

export default LoginForm;
