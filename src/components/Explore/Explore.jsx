import React from 'react';
// import Button from '@material-ui/core/Button';
// import { ThemeProvider } from '@material-ui/styles';
// import theme from '../Reusable/theme.jsx';
// import colors from '../Reusable/colors.js';

const Explore = () => {
  return (
    <div>
      <div>Language</div>
      <input type="checkbox" value="language" />
      <div>Science</div>
    </div>
    {/* <ThemeProvider theme={theme}>
      <Button variant="contained" color="primary" style={{ width: '200px' }}>
        Sign In / Sign Up
      </Button>
      <Button variant="contained" color="secondary">
        second
      </Button>
    </ThemeProvider>
    <button style={{ backgroundColor: `${colors.accent.yellow}` }}>push</button>
    <Explore /> */}
  );
};

export default Explore;
