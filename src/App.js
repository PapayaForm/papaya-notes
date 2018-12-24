import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Dashboard from './Dashboard';
import User from './data/User';
import SimpleStorage, { clearStorage, resetParentState  } from "react-simple-storage";


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

  handleChangeActiveCategory = value => {
    if(value !== null)
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

    if(this.state.emails && this.state.emails.length > 0) {
      for(let i = 0; i < this.state.emails.length; i++) {
        emails.push(User.SerializeFromStorage(this.state.emails[i]));
      }
    }
    currentUser = User.SerializeFromStorage(this.state.currentUser);

    this.setState({ emails: emails, currentUser: currentUser });
  }

  render() {

    const { emails, currentUser, activeCategory, lightTheme } = this.state;

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

    // add <SimpleStorage parent={this} /> to save state

    return (
      <MuiThemeProvider theme={theme}>
      <div className="container">
          <SimpleStorage parent={this} onParentStateHydrated={this.handleParentStateHydrated}/>
          <Dashboard 
              onChangeTheme = { this.handleChangeTheme }
              onChangeUser = { this.handleChangeUser }
              onChangeActiveCategory = { this.handleChangeActiveCategory }
              handleCreateUser = { this.handleCreateUser }
              handleClearStorage = { this.handleClearStorage }
              emails = { emails }
              currentUser = { currentUser }
              activeCategory = { activeCategory }
            />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
