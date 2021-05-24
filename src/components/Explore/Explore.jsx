import React from 'react';
import { Button } from '@material-ui/core';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import Category from './Category';
import './explore.css';
// import theme from '../Reusable/theme.jsx';
// import colors from '../Reusable/colors.js';
const categoryList = [
  'Math',
  'Language',
  'Science',
  'Literature',
  'Social Science',
  'Art',
  'Technology',
  'Business',
  'Music',
];
const categoryColors = [
  '#C7A7E8',
  '#AEE5F2',
  '#B1DBA8',
  '#F5E2AB',
  '#EB9083',
  '#EBB582',
  '#bdbdbd',
];
const useStyles = makeStyles({
  root: {
    backgroundColor: '#bdbdbd',
  },
});

const Explore = () => (
  <div id="Explore">
    Choose aread of interest
    <div id="categories">
      {categoryList.map((category, index) => (
        <Category name={category} index={index} />
      ))}
    </div>
  </div>
);

export default Explore;
/* <ThemeProvider theme={theme}>
      <Button variant="contained" color="primary" style={{ width: '200px' }}>
        Sign In / Sign Up
      </Button>
      <Button variant="contained" color="secondary">
        second
      </Button>
    </ThemeProvider>
    <button style={{ backgroundColor: `${colors.accent.yellow}` }}>push</button>
    <Explore /> */
