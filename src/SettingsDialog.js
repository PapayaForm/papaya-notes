import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
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


class SettigsDialog extends React.Component {

  state = {
    darkTheme: !this.props.lightTheme,
    localStorage: 'storageLocal',
    accountName: '',
    accountPass: '',
    openMessageBox: false,
    MessageBoxTitle: '',
    MessageBoxText: '',
  };

  handleClose = () => {
  };

  handleClearAll = () => {
    let message = 'Do you really want to delete all the data?';
    this.setState({ MessageBoxTitle: 'Confirm Delete', MessageBoxText: message, openMessageBox: true });
  };

  handleMessageBoxClose = value => {
    if (value === true)
      this.props.handleClearStorage();

    this.setState({ openMessageBox: false });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeChecked = event => {
    this.setState({ [event.target.name]: event.target.checked });

    if (event.target.name === 'darkTheme')
      this.props.handleChangeSettings(!this.state.darkTheme)
  };

  render() {
    const { classes, handleChangeSettings, handleClearStorage, lightTheme, ...other } = this.props;

    return (
      <Dialog className={classes.formdialog} onClose={this.handleClose} onExit={this.handleClose} onBackdropClick={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">
          Settings
        </DialogTitle>
        <DialogContent>

          <FormControl component="fieldset">
            <FormLabel component="legend">User Interface</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    name="darkTheme"
                    checked={this.state.darkTheme}
                    onChange={this.handleChangeChecked}
                    value="darkTheme"
                  />
                }
                label="Dark Theme"
              />
            </FormGroup>
          </FormControl>

          <Divider className={classes.dividerClass} />


          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Saved data</FormLabel>
            <FormHelperText>Be careful:<br />
              with local storage it is not possible to share notes and shopping lists between devices.<br />
              It is possible only with Google Account or Custom Account. But it requires internet connection.
            </FormHelperText>
            <RadioGroup
              aria-label="SavedData"
              name="localStorage"
              className={classes.group}
              value={this.state.localStorage}
              onChange={this.handleChange}
            >
              <FormControlLabel value="storageLocal" control={<Radio />} label="Local storage" />
              <FormControlLabel value="storageGoogle" control={<Radio />} label="Use Google Account" disabled />
              <FormControlLabel value="storageCustom" control={<Radio />} label="Custom Account" />

              <TextField
                required
                id="standard-required"
                label="Network account name"
                name="accountName"
                value={this.state.accountName}
                onChange={this.handleChange}
                className={classes.textField}
                margin="normal"
                fullWidth
                disabled={this.state.localStorage !== 'storageCustom'}
              />
              <TextField
                required
                id="password-required"
                label="Network account password"
                name="accountPass"
                value={this.state.accountPass}
                onChange={this.handleChange}
                className={classes.textField}
                margin="normal"
                type="password"
                fullWidth
                disabled={this.state.localStorage !== 'storageCustom'}
              />
            </RadioGroup>
          </FormControl>

          <Divider className={classes.dividerClass} />

          <Button color="secondary" onClick={this.handleClearAll}>
            Clear all saved data and users
          </Button>

          <Divider className={classes.dividerClass} />

        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => { this.props.onClose(); }}
          >
            OK
          </Button>
          <Button
            color="primary"
            onClick={() => { this.props.onClose(); }}
          >
            Cancel
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

SettigsDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  handleChangeSettings: PropTypes.func.isRequired,
  handleClearStorage: PropTypes.func.isRequired,
  lightTheme: PropTypes.bool.isRequired,
};

export default withStyles(styles)(SettigsDialog);