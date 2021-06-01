/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Modal,
  Grid,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import NavTopbar from './NavTopbar';
import CreateGroupModal from './CreateGroupModal';
import { auth } from '../../firebase';
import food from '../Reusable/NF_MOFAD_EATER_2978.0.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  header: {
    paddingTop: '10vh',
    position: 'relative',
  },
  title: {
    fontSize: '5vh',
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
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

const groupList = [
  'Himalayan food recipes',
  'Python for Dummies',
  'Organic Chemistry',
  'Zoomer meme culture',
  'Led Zeppelin fan club',
  'Java for Dummies',
  'Beethoven Symphonies',
  'Vietnamese food recipes',
  'Medieval History',
];

const GET_GROUPS = gql`
  query getAllChannels($category: String!) {
    getAllChannels(category: $category) {
      name
    }
  }
`;

const Dashboard = (props) => {
  const [open, setOpen] = useState(false);
  const [isLogged, setIsLogged] = useState([]);
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [category, selectCategory] = useState('History');
  const [group, selectGroup] = useState('Medieval History');
  const [searchedGroups, setSearchedGroups] = useState('');

  const handleJoin = (e) => {
    e.preventDefault();
    alert('Your request to join has been sent');
  };

  useEffect(() => {
    if (!auth.currentUser) {
      setIsLogged(<Redirect to="/signup" />);
    }
  }, []);

  return (
    <div className={classes.root}>
      {isLogged}
      <NavTopbar key={open} setOpen={setOpen} open={open} category={category} group={group} />
      <main className={clsx(classes.content, open && classes.contentShift)}>
        <Container maxWidth="md" className={classes.header}>
          <h1 className={classes.title}>Discover More Groups</h1>
          <Autocomplete
            debug
            noOptionsText={
              <Button type="button" onClick={() => setModalOpen(true)}>
                Create a Group
              </Button>
            }
            id="groupSearch"
            disableClearable
            value={searchedGroups}
            onChange={(e, value) => setSearchedGroups(value)}
            options={groupList.map((option) => option)}
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
          <Container className={classes.cardGrid} width="lg">
            <Grid container spacing={4}>
              {groupList
                .filter((cat) => {
                  return cat.toLowerCase().indexOf(searchedGroups.toLowerCase()) !== -1;
                })
                .map((cat) => (
                  <Grid item key={cat} xs={4} sm={4} md={4}>
                    <Card className={classes.card}>
                      <CardMedia className={classes.media} image={food} />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {cat}
                        </Typography>
                      </CardContent>
                      <CardActions className={classes.actions}>
                        <Button size="small" color="primary" onClick={handleJoin}>
                          Join Group
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Container>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <CreateGroupModal />
          </Modal>
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
