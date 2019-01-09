import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  formdialog: {
    fullWidth: true,
    maxWidth: 'sm',
    scroll: 'paper',
  },
});

class CreateUserDialog extends React.Component {

  state = {
    user: '',
    password: '',
    passwordConfirm: '',
  };

  handleClose = () => {
    this.setState({ user: '', password: '', passwordConfirm: ''});
  };

  handleClickCreateUser = () => {
    if(this.state.password === '' || this.state.password === this.state.passwordConfirm) {
      if(this.props.handleCreateUser(this.state.user, this.state.password) === true) {
      }
      this.setState({ user: '', password: ''});
      this.props.onClose();
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes,  handleCreateUser, ...other } = this.props;

    return (
      <Dialog className={classes.formdialog} onClose={this.handleClose} onExit={this.handleClose} onBackdropClick={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">
          Create profile
        </DialogTitle>
        <DialogContent>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
              <TextField
                required
                id="standard-required"
                label="User name"
                name="user"
                value={this.state.user}
                onChange={this.handleChange} 
                className={classes.textField}
                margin="normal"
              />

              <TextField
                id="standard-password-input"
                label="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange} 
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
              />

              <TextField
                id="standard-password-input-confirm"
                label="Confirm Password"
                name="passwordConfirm"
                value={this.state.passwordConfirm}
                onChange={this.handleChange} 
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                disabled={this.state.password === ''}
                error={this.state.password !== '' && this.state.password !== this.state.passwordConfirm}
              />

              <FormHelperText>
                Be careful:<br/>
                Password is optional. You may protect your profile with password, but if you forgot it - it is not possible to restore it.
              </FormHelperText>
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={this.handleClickCreateUser}
            disabled={this.state.user === '' || (this.state.password !== '' && this.state.password !== this.state.passwordConfirm)}
          >
            Create Profile
          </Button>
          <Button
            color="primary"
            onClick={() => {this.handleClose(); this.props.onClose();}}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

CreateUserDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  handleCreateUser: PropTypes.func,
};

export default withStyles(styles)(CreateUserDialog);