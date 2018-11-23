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
      {'email': 'user01@gmail.com', 'password': ''},
      {'email': 'user02@gmail.com', 'password': ''}, 
      {'email': 'user03@gmail.com', 'password': 'test'}
    ],
    categories: [
      {'id': 1, 'name': 'Dashboard', 'icon': 'Dashboard'},
      {'id': 2, 'name': 'Shopping', 'icon': 'Shopping'},
      {'id': 3, 'name': 'People', 'icon': 'People'},
      {'id': 4, 'name': 'Reports', 'icon': 'Reports'},
      {'id': 5, 'name': 'Calendar', 'icon': 'Calendar'},
      {'id': 6, 'name': 'Integrations', 'icon': 'Integrations'},
      {'id': 7, 'name': 'Assignment', 'icon': 'Assignment'},
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

    const { tableData, emails, categories, lightTheme } = this.state;

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
              categories = { categories }
            />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
