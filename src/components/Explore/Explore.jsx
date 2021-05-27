import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { Redirect } from 'react-router-dom';
import Category from './Category';
import './explore.css';
import theme from '../Reusable/theme';
import { auth } from '../../firebase';

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

// eslint-disable-next-line react/prop-types
const Explore = () => {
  const [categories, setCategories] = useState([]);
  const [isLogged, setIsLogged] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) {
      setIsLogged(<Redirect to="/signup" />);
    }
  }, []);

  return (
    <div id="Explore">
      {isLogged}
      <div className="exploreHeader">Choose areas of interest</div>
      <div id="categories">
        {categoryList.map((category, index) => (
          <Category
            name={category}
            index={index}
            addToCategories={setCategories}
            categories={categories}
          />
        ))}
      </div>
      <div className="buttonContainer">
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="secondary" className="nextButton">
            Next
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Explore;
