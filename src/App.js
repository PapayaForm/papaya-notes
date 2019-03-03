import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './Dashboard';
import User from './data/User';
// eslint-disable-next-line
import SimpleStorage, { clearStorage, resetParentState  } from "react-simple-storage";
import Category from './data/Category';
import readLocalFiles from '@loopmode/read-local-files';
import i18n from './i18n';
//import firebase from './firebase/firebase.js';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      currentUser: null,
      activeCategory: null,
      lightTheme: true,
      fontsize: 16,
      lang: '',
      refresh: false,
      dbuser: '',
      localStorage: 'storageLocal',
      accountName: '',
      accountPass: '',
      localStorageSettings: 'storageLocal',
      accountNameSettings: '',
      accountPassSettings: '',
    };
     // store the component's initial state to reset it
     this.initialState = this.state;
  }

  forceRefresh = () => {
    this.setState({refresh: !this.state.refresh});
  }

  handleChangeFontSize = fontsize => {
    if(fontsize === 16 || fontsize === 18 || fontsize === 20)
      this.setState({fontsize: fontsize});
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

  handleChangeLanguage = lang => {
    i18n.changeLanguage(lang);
    this.setState({ lang: lang });
  }

  handleChangeStorageSettings = event => {
    switch (event.target.name) {
      case 'localStorageSettings':
      case 'accountNameSettings':
      case 'accountPassSettings':
        this.setState({ [event.target.name]: event.target.value });
        break;
      default:
        break;
    }
  }

  handleValidateStorageSettings = applyFlag => {

    let bRet = false;

    if(applyFlag === true ) {
      if(this.ValidateAccount(this.state.accountNameSettings, this.state.accountPassSettings)) {
        this.setState({ 
          localStorage: this.state.localStorageSettings, 
          accountName: this.state.accountNameSettings, 
          accountPass: this.state.accountPassSettings });

        bRet = true;
      } 
      else {
        this.setState({ 
          localStorageSettings: this.state.localStorage, 
          accountNameSettings: this.state.accountName, 
          accountPassSettings: this.state.accountPass });
          
        bRet = false;
      }
    }
    else
    {
      if(this.state.localStorage !== 'storageLocal' && this.state.localStorageSettings === 'storageLocal') {
        //no login button pressed: we reset to std.
        this.setState({ 
          localStorage: 'storageLocal', 
          accountPassSettings: '',
          accountPass: ''
         });

        bRet = true;
      }
      if(this.state.localStorage === 'storageLocal' && this.state.localStorageSettings === 'storageCustom') {
        //no login button pressed: we reset to std.
        this.setState({ 
          localStorageSettings: 'storageLocal', 
          accountNameSettings: '', 
          accountPassSettings: '',
          accountName: '',
          accountPass: ''
         });

        bRet = false;
      }
    }

    return bRet;
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

    var returnValue = false;
    readLocalFiles({rejectTimeout: 3000})
      .then(fileInputs => {
        let data = fileInputs.map(input => JSON.parse(input.result));
        if(this.ValidateData(data[0]) && this.SetStateFromData(data[0]))
          returnValue = true;
      })
      .catch(error => {
        console.warn(error)
      });

    this.forceRefresh();

    return returnValue;
  }

  ValidateData = (data) => {
    // TODO 
    return true;
  }

  ValidateAccount = (login, pass) => {
    // TODO 
    if(login === 'Rafal')
      return true;
    
    return false;
  }

  SetStateFromData = (data) => {
    let emails = [];
    let currentUser = null
    let activeCategory = null;

    if(data.emails && data.emails.length > 0) {
      for(let i = 0; i < data.emails.length; i++) {
        emails.push(User.SerializeFromStorage(data.emails[i]));
      }
    }
    currentUser = User.SerializeFromStorage(data.currentUser);
    if(currentUser)
      activeCategory = Category.ReturnCategoryFromCollectionForGivenState(data.activeCategory, currentUser.categories)
    //activeCategory = Category.SerializeFromStorage(data.activeCategory);

    this.setState({ emails: emails, currentUser: currentUser, activeCategory: activeCategory });

    return true;
  }

  handleParentStateHydrated = () => {
    // User Data settings are restoreded using common SetStateFromData function ...
    this.SetStateFromData(this.state);

    // ... and UI Settings, like lang, theme and fontsize are restored just from local-state
    if(this.state.lang !== '' && i18n.language !== this.state.lang)
      i18n.changeLanguage(this.state.lang);
  }

  render() {

    const theme = this.state.lightTheme === true ? createMuiTheme({
        palette: {
          type: 'light',
        },
        typography: {
          useNextVariants: true,
          htmlFontSize: this.state.fontsize,
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
          htmlFontSize: this.state.fontsize,
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
              handleChangeStorageSettings = { this.handleChangeStorageSettings }
              handleValidateStorageSettings = { this.handleValidateStorageSettings }
              handleChangeLanguage = { this.handleChangeLanguage }
              handleChangeFontSize = { this.handleChangeFontSize }
              handleImportStorage = { this.handleImportStorage }
              handleExportStorage = { this.handleExportStorage }
              lang = { this.state.lang === '' ? i18n.language : this.state.lang }
              emails = { this.state.emails }
              currentUser = { this.state.currentUser }
              activeCategory = { this.state.activeCategory }
              lightTheme = { this.state.lightTheme }
              fontSize = { this.state.fontsize }
              localStorageSettings = { this.state.localStorageSettings }
              accountNameSettings = { this.state.accountNameSettings }
              accountPassSettings = { this.state.accountPassSettings }
            />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
