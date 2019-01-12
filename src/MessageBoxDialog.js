import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import i18n from './i18n';

const styles = theme => ({
  });

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class MessageBoxDialog extends React.Component {

  handleClose = () => {
    this.props.onClose(false);
  };

  handleOKClose = () => {
    this.props.onClose(true);
  };

  render() {
    const { classes, dialogTitle, dialogMessage, ...other } = this.props;

    return (
      <div>
        <Dialog
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          {...other}
        >
          <DialogTitle id="alert-dialog-slide-title">
            {dialogTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {dialogMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {i18n.t('Cancel')}
            </Button>
            <Button onClick={this.handleOKClose} color="primary">
              {i18n.t('OK')}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

MessageBoxDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    dialogMessage: PropTypes.string.isRequired,
    dialogTitle: PropTypes.string,
  };
  
export default withStyles(styles)(MessageBoxDialog);


