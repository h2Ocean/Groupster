import React from 'react';
// import { Button } from '@material-ui/core';
// import { ThemeProvider } from '@material-ui/styles';
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

const Explore = () => (
  <div id="Explore">
    Choose areas of interest
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
