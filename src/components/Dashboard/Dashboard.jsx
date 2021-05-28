/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
// import { ThemeProvider } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import NavTopbar from './NavTopbar';
import NavSidebar from './NavSidebar/NavSidebar';
import { auth } from '../../firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: '10vw',
  },
  header: {
    paddingTop: '10vh',
    position: 'relative',
  },
  title: {
    fontSize: '5vh',
    fontFamily: 'Roboto',
  },
  cardGrid: {
    paddingTop: '8vh',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    display: 'flex',
    justifyContent: 'end',
  },
  cardContent: {
    flexGrow: 1,
  },
  createGroupButton: {
    border: '1px solid',
    position: 'absolute',
    left: '53vh',
    bottom: '86.2vh',
  },
  groupModal: {
    position: 'absolute',
    width: '30vw',
    height: '63vh',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
  },
}));

const categoryList = [
  'Himalayan food recipes',
  'Python for Dummies',
  'Organic Chemistry',
  'Zoomer meme culture',
  'Led Zeppelin fan club',
  'Java for Dummies',
  'Beethoven Symphonies',
  'Vietnamese food recipes',
  'Theoritical Physics',
];

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [isLogged, setIsLogged] = useState([]);
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(true);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (!auth.currentUser) {
      setIsLogged(<Redirect to="/signup" />);
    }
  }, []);
  const body = (
    <div style={{ top: '20%', left: '40%' }} className={classes.groupModal}>
      <h2>Text in a modal</h2>
      <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
    </div>
  );
  return (
    <div className={classes.root}>
      {isLogged}
      <NavTopbar key={open} setOpen={setOpen} open={open} />
      <NavSidebar />
      <main className={clsx(classes.content, open && classes.contentShift)}>
        <Container maxWidth="sm" className={classes.header}>
          <h1 className={classes.title}>Discover More Groups</h1>
          <Autocomplete
            debug
            noOptionsText={
              <Button type="button" onClick={handleModalOpen}>
                Create a Group
              </Button>
            }
            id="groupSearch"
            disableClearable
            options={categoryList.map((option) => option)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search or Create Groups"
                margin="normal"
                variant="outlined"
                InputProps={{ ...params.InputProps, type: 'search' }}
              />
            )}
          />
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {categoryList.map((category) => (
                <Grid item key={category} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {category}
                      </Typography>
                    </CardContent>
                    <CardActions className={classes.actions}>
                      <Button size="small" color="primary">
                        Join Group
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Container>
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </main>
    </div>
  );
};

export default Dashboard;
