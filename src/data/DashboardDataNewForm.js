import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
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
      <Dialog className={classes.formdialog} fullWidth={true} onClose={this.handleClose} onExit={this.handleClose} onBackdropClick={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">
          {i18n.t('Add new item')}
        </DialogTitle>
        <DialogContent>
          <TextField
            required
            id="standard-required"
            label={i18n.t('Name')}
            name="name"
            value={this.state.name}
            onChange={this.handleChange} 
            className={classes.textField}
            margin="normal"
            fullWidth
          />
          <TextField
            id="outlined-multiline-static"
            label={i18n.t('Description')}
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
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={this.handleAddItem}
            disabled={this.state.name === ''}
          >
            {i18n.t('Add item')}
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

DashboardDataNewForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  handleAddItem: PropTypes.func.isRequired,
};

export default withStyles(styles)(DashboardDataNewForm);