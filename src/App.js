import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
          test
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
