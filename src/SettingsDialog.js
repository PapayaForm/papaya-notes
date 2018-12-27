import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
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
  formdialog: {
    fullWidth: true,
    maxWidth: 'md',
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

class SettigsDialog extends React.Component {

  state = {
    darkTheme: !this.props.lightTheme,
  };

  handleClose = () => {
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeChecked = event => {
    this.setState({ [event.target.name]: event.target.checked });

    this.props.handleChangeSettings(!this.state.darkTheme)
  };

  render() {
    const { classes, handleAddItem, ...other } = this.props;

    return (
      <Dialog fullWidth={true} maxWidth='sm' onClose={this.handleClose} onExit={this.handleClose} onBackdropClick={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <Paper className={classes.paper}>
          
        <FormControl component="fieldset">
            <FormLabel component="legend">UI settings</FormLabel>
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
            <FormHelperText>Be careful</FormHelperText>
          </FormControl>
          
          <Button
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {this.props.onClose();}}
          >
            OK
          </Button>
        </Paper>
      </Dialog>
    );
  }
}

SettigsDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  handleChangeSettings: PropTypes.func.isRequired,
  lightTheme: PropTypes.bool.isRequired,
};

export default withStyles(styles)(SettigsDialog);