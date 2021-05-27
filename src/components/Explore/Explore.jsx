import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { Redirect, Link } from 'react-router-dom';
import Category from './Category';
import './explore.css';
import theme from '../Reusable/theme';
import { auth } from '../../firebase';
import widgets from '../Reusable/widgets';

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
const newButton = (
  <ThemeProvider theme={theme}>
    <Button variant="contained" color="secondary" className="nextButton">
      Next
    </Button>
  </ThemeProvider>
);
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
        <Link to="/">{widgets.button1('next', '150px')}</Link>
      </div>
    </div>
  );
};

export default Explore;
