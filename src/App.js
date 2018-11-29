import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Dashboard from './Dashboard';
import User from './data/User';
import Category from './data/Category';


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
    categories: [
      new Category('Dashboard', 'Dashboard'),
      new Category('Shopping', 'Shopping'),
      new Category('People', 'People'),
      new Category('Reports', 'Reports'),
      new Category('Calendar', 'Calendar'),
      new Category('Integrations', 'Integrations'),
      new Category('Assignment', 'Assignment'),
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
