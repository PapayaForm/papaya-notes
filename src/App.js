import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Dashboard from './Dashboard';
import User from './data/User';


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
      new User('user01@gmail.com', ''),
      new User('user02@gmail.com', ''),
      new User('user03@gmail.com', 'test')
    ],
    currentUser: null,
    lightTheme: true,
  };

  handleChangeTheme = () => {
    const { lightTheme } = this.state;
    if(lightTheme === true)
      this.setState({lightTheme: false});
    else
      this.setState({lightTheme: true});
  }

  handleChangeUser = value => {
    if(value !== null)
      this.setState({currentUser: value});
  }

  render() {

    const { tableData, emails, currentUser, lightTheme } = this.state;

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
              onChangeTheme = { this.handleChangeTheme }
              onChangeUser = { this.handleChangeUser }
              tableData = { tableData }
              emails = { emails }
              currentUser = { currentUser }
            />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
