import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
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

class SignIn extends React.Component {

  state = {
    password: '',
    passerror: false
  };

  handleClose = () => {
    this.setState({ password: '', passerror: false });
  };

  handleExit = () => {
    this.setState({ password: '', passerror: false });
  };

  handleBackdropClick = () => {
    this.setState({ password: '', passerror: false });
  }

  handleClickLogin = () => {
    if( this.props.userToLogin.ValidatePassword(this.state.password) ) {
      this.setState({ password: '', passerror: false });
      this.props.handleSignedIn(this.props.userToLogin);
    }
    else {
      this.setState({ password: '', passerror: true });
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    if(this.state.passerror === true)
      this.setState({ passerror: false })
  };

  render() {
    const { classes, userToLogin, handleSignedIn, ...other } = this.props;
    const textSignIn = '"' +  (userToLogin !== null ? userToLogin.email : '') + '"  - please sign in' 

    return (
      <Dialog onClose={this.handleClose} onExit={this.handleExit} onBackdropClick={this.handleBackdropClick} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          {textSignIn}
        </DialogTitle>
        <Paper className={classes.paper}>
          
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input 
                name="password" 
                type="password"
                error={this.state.passerror}
                value={this.state.password}
                onChange={this.handleChange} 
                id="password" 
                autoComplete="current-password" />
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleClickLogin}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </Dialog>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  userToLogin: PropTypes.object,
  onClose: PropTypes.func,
  handleSignedIn: PropTypes.func,
};

export default withStyles(styles)(SignIn);