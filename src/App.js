import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './Dashboard';
import User from './data/User';
// eslint-disable-next-line
import SimpleStorage, { clearStorage, resetParentState  } from "react-simple-storage";
import Category from './data/Category';
import readLocalFiles from '@loopmode/read-local-files';


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

  handleExportStorage = () => {
    console.log('exportStorage Called.');
    
    var jsonData = JSON.stringify(this.state);
    var fileDownload = require('js-file-download');
    fileDownload(jsonData, 'PapayaNotesExportedData.json');

    this.forceRefresh();
  }

  handleImportStorage = () => {
    console.log('importStorage Called.');

    readLocalFiles()
      .then(fileInputs => {
        let data = fileInputs.map(input => JSON.parse(input.result))
        if(this.ValidateData(data[0]))
          this.SetStateFromData(data[0]);
      })
      .catch(error => {
        console.warn(error)
      });

    this.forceRefresh();
  }

  ValidateData = (data) => {
    // TODO 
    return true;
  }

  SetStateFromData = (data) => {
    let emails = [];
    let currentUser = null
    let activeCategory = null;
    let lightTheme = true;

    if(data.emails && data.emails.length > 0) {
      for(let i = 0; i < data.emails.length; i++) {
        emails.push(User.SerializeFromStorage(data.emails[i]));
      }
    }
    currentUser = User.SerializeFromStorage(data.currentUser);
    activeCategory = Category.SerializeFromStorage(data.activeCategory);
    lightTheme = data.lightTheme;

    this.setState({ emails: emails, currentUser: currentUser, activeCategory: activeCategory, lightTheme: lightTheme});
  }

  handleParentStateHydrated = () => {
    this.SetStateFromData(this.state);
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
              handleImportStorage = { this.handleImportStorage }
              handleExportStorage = { this.handleExportStorage }
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
