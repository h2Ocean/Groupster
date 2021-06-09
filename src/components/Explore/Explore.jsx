import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Category from './Category';
import './explore.css';
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
        <Link to="/dashboard">{widgets.button1('next', '150px')}</Link>
      </div>
    </div>
  );
};

export default Explore;
