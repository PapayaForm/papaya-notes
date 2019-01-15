import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import withStyles from '@material-ui/core/styles/withStyles';
import i18n from '../i18n';

const styles = theme => ({
  formdialog: {
    fullWidth: true,
    maxWidth: 'sm',
    scroll: 'paper',
  },
});

class MultiDataNewForm extends React.Component {

  state = {
    text: '',
  };

  handleClose = () => {
    this.setState({ text: '' });
  };

  handleAddItem = () => {
    if(this.props.handleAddItem(this.state.text) === true) {
    }
    this.setState({ text: '' });
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
          {i18n.t('Add new items')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {i18n.t('This allows you to enter many items in one shot. Please enter...')}
          </DialogContentText>
          <TextField
            required
            id="standard-required"
            label={i18n.t('List of entities')}
            name="text"
            value={this.state.text}
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
            disabled={this.state.text === ''}
          >
            {i18n.t('Add items')}
          </Button>
          <Button
            color="primary"
            onClick={() => {this.handleClose(); this.props.onClose();}}
          >
            {i18n.t('Cancel')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

MultiDataNewForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  handleAddItem: PropTypes.func.isRequired,
};

export default withStyles(styles)(MultiDataNewForm);