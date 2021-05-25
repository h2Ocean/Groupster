import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  appBarSpacer: theme.mixins.toolbar,
}));

const SuggestedGroups = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <div className={classes.appBarSpacer} />
      <h2>Based on your interested in...</h2>
      <li>Astrology</li>
      <li>Computer Science</li>
    </Container>
  );
};

export default SuggestedGroups;
