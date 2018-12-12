import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import green from '@material-ui/core/colors/green';


const styles = {
  avatar: {
    backgroundColor: green[100],
    color: green[600],
  },
};

class LoginDialog extends React.Component {


  handleClose = () => {
    this.props.onClose(this.props.currentUser);
  };

  handleListItemClick = value => {
    this.props.onClose(value !== this.props.currentUser ? value : null);
  };

  render() {
    const { classes, onClose, currentUser,  ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">Select user</DialogTitle>
        <div>
          <List>
            {this.props.emails.map(n => (
              <ListItem button onClick={() => this.handleListItemClick(n)} key={n.email}>
                <ListItemAvatar>
                  {currentUser !== null && currentUser.email === n.email ? (
                      <Avatar className={classes.avatar} >
                        <PersonIcon />
                      </Avatar>
                    ) : (
                      <Avatar >
                        <PersonIcon />
                      </Avatar>
                    )}
                </ListItemAvatar>
                <ListItemText primary={n.email} />
              </ListItem>
            ))}
            <ListItem button onClick={() => this.handleListItemClick('addAccount')}>
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="add account" />
            </ListItem>
          </List>
        </div>
      </Dialog>
    );
  }
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  currentUser: PropTypes.object,
  emails: PropTypes.array.isRequired,
};

export default withStyles(styles)(LoginDialog);