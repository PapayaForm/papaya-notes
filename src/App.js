import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './Dashboard';
import User from './data/User';
// eslint-disable-next-line
import SimpleStorage, { clearStorage, resetParentState  } from "react-simple-storage";
import Category from './data/Category';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      currentUser: null,
      activeCategory: null,
      lightTheme: true,
      refresh: false,
    };
     // store the component's initial state to reset it
     this.initialState = this.state;
  }

  forceRefresh = () => {
    this.setState({refresh: !this.state.refresh});
  }

  handleChangeTheme = lightTheme => {
    this.setState({lightTheme: lightTheme});
  }

  handleChangeUser = value => {
    if(value !== null && value !== this.state.currentUser) {
      this.setState({currentUser: value});
      this.setState({activeCategory: null});
    }
  }

  handleChangeActiveCategory = value => {
    if(value !== null && value !== this.state.activeCategory)
      this.setState({activeCategory: value});
  }

  handleCreateUser = (user, password) => {
    if(user !== '') {
      this.setState(prevState => ({
        emails: [...prevState.emails, new User(user, password)]
      }))
    }
    return true;
  }

  handleClearStorage = () => {
    console.log('clearStorage Called.');
    
    //clearStorage(null);
    resetParentState(this, this.initialState, []);
    

    this.forceRefresh();
  }

  handleParentStateHydrated = () => {
    let emails = [];
    let currentUser = null
    let activeCategory = null;

    if(this.state.emails && this.state.emails.length > 0) {
      for(let i = 0; i < this.state.emails.length; i++) {
        emails.push(User.SerializeFromStorage(this.state.emails[i]));
      }
    }
    currentUser = User.SerializeFromStorage(this.state.currentUser);
    activeCategory = Category.SerializeFromStorage(this.state.activeCategory);

    this.setState({ emails: emails, currentUser: currentUser, activeCategory: activeCategory, });
  }

  render() {

    const theme = this.state.lightTheme === true ? createMuiTheme({
        palette: {
          type: 'light',
        },
        typography: {
          useNextVariants: true,
        },
      }) : createMuiTheme({
        palette: {
          type: 'dark',
          primary: {
            light: 'rgb(113, 205, 250)',
            main: 'rgb(63, 155, 200)',
            dark: 'rgb(23, 105, 150)'
          },
        },
        typography: {
          useNextVariants: true,
        },
      })

    // add <SimpleStorage parent={this} /> to save state

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className="container">
          <SimpleStorage parent={this} onParentStateHydrated={this.handleParentStateHydrated}/>
          <Dashboard 
              onChangeTheme = { this.handleChangeTheme }
              onChangeUser = { this.handleChangeUser }
              onChangeActiveCategory = { this.handleChangeActiveCategory }
              handleCreateUser = { this.handleCreateUser }
              handleClearStorage = { this.handleClearStorage }
              emails = { this.state.emails }
              currentUser = { this.state.currentUser }
              activeCategory = { this.state.activeCategory }
              lightTheme = { this.state.lightTheme }
            />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
