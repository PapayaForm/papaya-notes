import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    close: {
      padding: theme.spacing.unit / 2,
    },
  });


class ShortInfoMessage extends React.Component {

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.onClose();
  };

  handleExit = () => {
  };

  render() {
    const { classes, dialogMessage, ...other } = this.props;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          autoHideDuration={6000}
          onClose={this.handleClose}
          onExit={this.handleExit}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{dialogMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
          {...other}
        />
      </div>
    );
  }
}

ShortInfoMessage.propTypes = {
    classes: PropTypes.object.isRequired,
    dialogMessage: PropTypes.string.isRequired,
  };
  
export default withStyles(styles)(ShortInfoMessage);
