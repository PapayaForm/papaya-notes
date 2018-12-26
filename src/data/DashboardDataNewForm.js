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

class DashboardDataNewForm extends React.Component {

  state = {
    name: '',
    desc: '',
  };

  handleClose = () => {
    this.setState({ name: '', desc: ''});
  };

  handleAddItem = () => {
    if(this.props.handleAddItem(this.state.name, this.state.desc) === true) {
    }
    this.setState({ name: '', desc: ''});
    this.props.onClose();
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, handleAddItem, ...other } = this.props;

    return (
      <Dialog fullWidth={true} maxWidth='sm' onClose={this.handleClose} onExit={this.handleClose} onBackdropClick={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">
          New data
        </DialogTitle>
        <Paper className={classes.paper}>
          
          <TextField
            required
            id="standard-required"
            label="Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange} 
            className={classes.textField}
            margin="normal"
            fullWidth
          />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            name="desc"
            multiline
            rows="4"
            value={this.state.desc}
            onChange={this.handleChange} 
            className={classes.textField}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.handleAddItem}
          >
            Add item
          </Button>
        </Paper>
      </Dialog>
    );
  }
}

DashboardDataNewForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  handleAddItem: PropTypes.func.isRequired,
};

export default withStyles(styles)(DashboardDataNewForm);