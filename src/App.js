import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Dashboard from './Dashboard';

class App extends Component {
  render() {

    const theme = createMuiTheme({
      palette: {
        type: 'dark',
      },
    });

    return (
      <MuiThemeProvider theme={theme}>
      <div className="container">
          <Dashboard></Dashboard>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
