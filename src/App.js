import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Dashboard from './Dashboard';

class App extends Component {
  state = {
    tableData: [
      {
        'id': 1,
        'name': 'Test1',
        'quantity': 1,
        'num': 1.0
      },
      {
        'id': 2,
        'name': 'Test2',
        'quantity': 2,
        'num': 2.0
      },
      {
        'id': 3,
        'name': 'Test3',
        'quantity': 3,
        'num': 1.3
      },
      {
        'id': 4,
        'name': 'Test4',
        'quantity': 4,
        'num': 1.7
      }
    ],
    emails: [
      {'email': 'user01@gmail.com'},
      {'email': 'user02@gmail.com'}, 
      {'email': 'user03@gmail.com'}
    ],
    lightTheme: true,
  };

  handleChangeTheme = () => {
    const { lightTheme } = this.state;
    if(lightTheme === true)
      this.setState({lightTheme: false});
    else
      this.setState({lightTheme: true});
  }

  render() {

    const { tableData, emails, lightTheme } = this.state;

    const theme = lightTheme === true ? createMuiTheme({
        palette: {
          type: 'light',
        },
        typography: {
          useNextVariants: true,
        },
      }) : createMuiTheme({
        palette: {
          type: 'dark',
        },
        typography: {
          useNextVariants: true,
        },
      })


    return (
      <MuiThemeProvider theme={theme}>
      <div className="container">
          <Dashboard 
              handleChangeTheme={this.handleChangeTheme}
              tableData = { tableData }
              emails = { emails }
            />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
