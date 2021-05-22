import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#A3E6C5',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#7E6ECB',
      light: '#BCB4E4',
    },
  },
});

export default theme;
