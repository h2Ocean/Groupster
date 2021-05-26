/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
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
import Grid from '@material-ui/core/Grid';
import NavTopbar from './NavTopbar';
import NavSidebar from './NavSidebar/NavSidebar';

const useStyles = makeStyles((theme) => ({
  root: {
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
    marginRight: '20vw',
  },
  header: {
    paddingTop: '10vh',
  },
  title: {
    fontSize: '5vh',
    fontFamily: 'Roboto',
  },
  cardGrid: {
    paddingTop: '5vh',
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
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavTopbar key={open} setOpen={setOpen} open={open} />
      <NavSidebar />
      <main className={clsx(classes.content, open && classes.contentShift)}>
        <Container maxWidth="sm" className={classes.header}>
          <h1 className={classes.title}>Discover More Groups</h1>
          <Autocomplete
            freeSolo
            id="groupSearch"
            disableClearable
            options={categoryList.map((option) => option)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Groups"
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
      </main>
    </div>
  );
};

export default Dashboard;
