import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  formdialog: {
    fullWidth: true,
    maxWidth: 'sm',
    scroll: 'paper',
  },
});

class ShopingDataNewForm extends React.Component {

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
      <Dialog className={classes.formdialog} fullWidth={true} onClose={this.handleClose} onExit={this.handleClose} onBackdropClick={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">
          New data
        </DialogTitle>
        <DialogContent>
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
            id="standard"
            label="Description"
            name="desc"
            value={this.state.desc}
            onChange={this.handleChange} 
            className={classes.textField}
            margin="normal"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={this.handleAddItem}
            disabled={this.state.name === ''}
          >
            Add item
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

ShopingDataNewForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  handleAddItem: PropTypes.func.isRequired,
};

export default withStyles(styles)(ShopingDataNewForm);