import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class CreateUserDialog extends React.Component {

  state = {
    user: '',
    password: '',
  };

  handleClose = () => {
    this.setState({ user: '', password: ''});
  };

  handleExit = () => {
    this.setState({ user: '', password: ''});
  };

  handleBackdropClick = () => {
    this.setState({ user: '', password: ''});
  }

  handleClickCreateUser = () => {
    if(this.props.handleCreateUser(this.state.user, this.state.password) === true) {
    }
    this.setState({ user: '', password: ''});
    this.props.onClose();
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes,  handleCreateUser, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} onExit={this.handleExit} onBackdropClick={this.handleBackdropClick} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">
          Create user
        </DialogTitle>
        <Paper className={classes.paper}>
          
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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.handleClickCreateUser}
          >
            Create User
          </Button>
        </Paper>
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