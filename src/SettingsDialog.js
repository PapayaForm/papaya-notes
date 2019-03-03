import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Divider from '@material-ui/core/Divider';
import MessageBoxDialog from './MessageBoxDialog';
import i18n from './i18n';


const styles = theme => ({
  formdialog: {
    fullWidth: true,
    maxWidth: 'sm',
    scroll: 'paper',
  },
  dividerClass: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3,
  },
});


const MessageBoxActionsEnum = Object.freeze({
  "eNone": 0,
  "eDeleteAllData": 1,
  "eImport": 2,
  "eLogin": 3,
});


class SettingsDialog extends React.Component {

  state = {
    openMessageBox: false,
    MessageBoxTitle: '',
    MessageBoxText: '',
    MessageBoxAction: MessageBoxActionsEnum.eNone,
  };

  handleClose = () => {
    this.props.handleValidateStorageSettings(false);
  };

  handleImport = () => {
    let action = MessageBoxActionsEnum.eImport;
    let message = i18n.t('This operation will overwrite (delete) all existing data. Do you really want to import data from file?');
    this.setState({ MessageBoxTitle: i18n.t('Confirm Import'), MessageBoxText: message, MessageBoxAction: action, openMessageBox: true });
  };

  handleExport = () => {
    this.props.handleExportStorage();
  };

  handleClearAll = () => {
    let action = MessageBoxActionsEnum.eDeleteAllData;
    let message = i18n.t('Do you really want to delete all the data?');
    this.setState({ MessageBoxTitle: i18n.t('Confirm Delete'), MessageBoxText: message, MessageBoxAction: action, openMessageBox: true });
  };

  handleSignItToStorage = () => {
    if(this.props.handleValidateStorageSettings(true) === false) {
      let action = MessageBoxActionsEnum.eLogin;
      let message = i18n.t('Login failed');
      this.setState({ MessageBoxTitle: i18n.t('Information'), MessageBoxText: message, MessageBoxAction: action, infoDialog: true, openMessageBox: true });
    }
    else {
      let action = MessageBoxActionsEnum.eLogin;
      let message = i18n.t('Login succeeded - from now you can share data with other devices using the same login');
      this.setState({ MessageBoxTitle: i18n.t('Information'), MessageBoxText: message, MessageBoxAction: action, infoDialog: true, openMessageBox: true });
    }

  }

  handleMessageBoxClose = value => {
    if (value === true) {

      switch (this.state.MessageBoxAction) {
        case MessageBoxActionsEnum.eDeleteAllData:
          this.props.handleClearStorage();
          break;
        case MessageBoxActionsEnum.eImport:
          {
            if (this.props.handleImportStorage()) {
              let action = MessageBoxActionsEnum.eNone;
              let message = i18n.t('Data import succeeded');
              this.setState({ MessageBoxTitle: i18n.t('Info:'), MessageBoxText: message, MessageBoxAction: action, openMessageBox: true });
            }
            else {
              let action = MessageBoxActionsEnum.eNone;
              let message = i18n.t('Data import failed');
              this.setState({ MessageBoxTitle: i18n.t('Info:'), MessageBoxText: message, MessageBoxAction: action, openMessageBox: true });
            }
            break;
          }
        case MessageBoxActionsEnum.eLogin:
        default:
          break;
      }
    }

    this.setState({ MessageBoxAction: MessageBoxActionsEnum.eNone, openMessageBox: false });
  };


  render() {
    const { classes, handleChangeThemeSettings, handleClearStorage, handleChangeLanguage, handleChangeFontSize, handleChangeStorageSettings,
      handleImportStorage, handleExportStorage, lightTheme, lang, fontSize, localStorageSettings, accountNameSettings, accountPassSettings,
      handleValidateStorageSettings, ...other } = this.props;

    return (
      <Dialog className={classes.formdialog} onClose={this.handleClose} onExit={this.handleClose} onBackdropClick={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">
          Settings
        </DialogTitle>
        <DialogContent>

          <FormControl component="fieldset">
            <FormLabel component="legend">{i18n.t('User Interface')}</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    name="darkTheme"
                    checked={!this.props.lightTheme}
                    onChange={() => { this.props.handleChangeThemeSettings(!this.props.lightTheme) }}
                    value="darkTheme"
                  />
                }
                label={i18n.t('Dark Theme')}
              />
            </FormGroup>
          </FormControl>

          <br />

          <FormControl component="fieldset" className={classes.formControl}>
            <FormHelperText>{i18n.t('Font Size')}</FormHelperText>
            <RadioGroup
              aria-label="FontSize"
              name="fontSize1"
              className={classes.group}
              value={this.props.fontSize.toString()}
              onChange={(event) => {this.props.handleChangeFontSize(Number(event.target.value));}}
            >
              <FormControlLabel value="16" control={<Radio />} label={i18n.t('Normal')} />
              <FormControlLabel value="18" control={<Radio />} label={i18n.t('Medium')} />
              <FormControlLabel value="20" control={<Radio />} label={i18n.t('Small')} />
            </RadioGroup>
          </FormControl>

          <br/>

          <FormControl fullWidth={true} component="fieldset" className={classes.formControl}>
            <InputLabel htmlFor="lang-simple">{i18n.t('User Interface Language')}</InputLabel>
            <Select
              fullWidth={true}
              value={this.props.lang}
              onChange={(event) => {this.props.handleChangeLanguage(event.target.value);} }
              inputProps={{
                name: 'lang',
                id: 'lang-simple',
              }}
            >
              <MenuItem value="en">
                {i18n.t('English')}
              </MenuItem>
              <MenuItem value="pl">
                {i18n.t('Polish')}
              </MenuItem>
            </Select>
          </FormControl>

          

          <Divider className={classes.dividerClass} />


          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">{i18n.t('Saved data')}</FormLabel>
            <FormHelperText>Be careful:<br />
              with local storage it is not possible to share notes and shopping lists between devices.<br />
              It is possible only with Google Account or Custom Account. But it requires internet connection.
            </FormHelperText>
            <RadioGroup
              aria-label="SavedData"
              name="localStorageSettings"
              className={classes.group}
              value={this.props.localStorageSettings}
              onChange={this.props.handleChangeStorageSettings}
            >
              <FormControlLabel value="storageLocal" control={<Radio />} label={i18n.t('Local storage')} />
              <FormControlLabel value="storageGoogle" control={<Radio />} label={i18n.t('Use Google Account')} disabled />
              <FormControlLabel value="storageCustom" control={<Radio />} label={i18n.t('Custom Account')} />
            </RadioGroup>
            <TextField
              required
              id="standard-required"
              label={i18n.t('Network account name')}
              name="accountNameSettings"
              value={this.props.accountNameSettings}
              onChange={this.props.handleChangeStorageSettings}
              className={classes.textField}
              margin="normal"
              fullWidth
              disabled={this.props.localStorageSettings !== 'storageCustom'}
            />
            <TextField
              required
              id="password-required"
              label={i18n.t('Network account password')}
              name="accountPassSettings"
              value={this.props.accountPassSettings}
              onChange={this.props.handleChangeStorageSettings}
              className={classes.textField}
              margin="normal"
              type="password"
              fullWidth
              disabled={this.props.localStorageSettings !== 'storageCustom'}
            />
            <Button color="primary" name="signin" onClick={this.handleSignItToStorage} disabled={this.props.localStorageSettings !== 'storageCustom'}>
              {i18n.t('Sign in')}
            </Button>
          </FormControl>

          <Divider className={classes.dividerClass} />


          <Button color="primary" onClick={this.handleImport}>
            {i18n.t('Import')}
          </Button>
          <Button color="primary" onClick={this.handleExport}>
            {i18n.t('Export')}
          </Button>
          <Button color="secondary" onClick={this.handleClearAll}>
            {i18n.t('Clear all saved data and users')}
          </Button>

          <Divider className={classes.dividerClass} />

        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => { this.props.onClose(); }}
          >
            {i18n.t('OK')}
          </Button>
          <Button
            color="primary"
            onClick={() => { this.props.onClose(); }}
          >
            {i18n.t('Cancel')}
          </Button>
        </DialogActions>


        <MessageBoxDialog
          classes={this.classes}
          open={this.state.openMessageBox}
          onClose={this.handleMessageBoxClose.bind(this)}
          dialogTitle={this.state.MessageBoxTitle}
          dialogMessage={this.state.MessageBoxText}
        />

      </Dialog>
    );
  }
}

SettingsDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  handleChangeThemeSettings: PropTypes.func.isRequired,
  handleChangeStorageSettings: PropTypes.func.isRequired,
  handleValidateStorageSettings: PropTypes.func.isRequired,
  handleChangeLanguage: PropTypes.func.isRequired,
  handleChangeFontSize: PropTypes.func.isRequired,
  handleClearStorage: PropTypes.func.isRequired,
  handleImportStorage: PropTypes.func.isRequired,
  handleExportStorage: PropTypes.func.isRequired,
  lightTheme: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
  localStorageSettings: PropTypes.string,
  accountNameSettings: PropTypes.string,
  accountPassSettings: PropTypes.string,
};

export default withStyles(styles)(SettingsDialog);