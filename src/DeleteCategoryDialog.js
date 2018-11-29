import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItems from './listMenuItems';
import MessageBoxDialog from './MessageBoxDialog';
import ShortInfoMessage from './ShortInfoMessage';



const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  topmargin: {
      marginTop: theme.spacing.unit * 4,
    },
});



class DeleteCategoryDialog extends React.Component {

  state = {
    activeDlgCategory: null,
    openMessageBox: false,
    openShortInfoMessage: false,
    MessageBoxTitle: '',
    MessageBoxText: '',
    shortInfoText: '',
  };

  handleClose = () => {
    this.props.onClose();
    this.setState({ activeDlgCategory: null });
  };

  handleExit = () => {
    this.setState({ activeDlgCategory: null });
  };

  handleDelete = () => {
    if(this.state.activeDlgCategory !== null) {
      let message = 'Do you really want to delete category: "' + this.state.activeDlgCategory.name + '"?';
      this.setState({MessageBoxTitle: 'Confirm Delete', MessageBoxText: message, openMessageBox: true});
    }
  };

  handleMessageBoxClose = value => {
    if(value === true) {
      if(this.state.activeDlgCategory !== null) {
        for (var i = 0; i < this.props.categories.categories.length; i++) {
          if (this.props.categories.categories[i] === this.state.activeDlgCategory) {
            this.props.categories.categories.splice(i, 1);
            let message = 'Category: "' + this.state.activeDlgCategory.name + '" deleted';
            this.setState({shortInfoText: message, openShortInfoMessage: true, activeDlgCategory: null});
            break;
          }
        }
      }
    }
    else{

    }
    this.setState({ openMessageBox: false });
  };

  handleShortInfoClose = () => {
    this.setState({ openShortInfoMessage: false });
  };

  handleClickCategory = value => {
    this.setState({ activeDlgCategory: value });
  };

  render() {
    const { classes,  ...other } = this.props;

    return (
      <div>
        <Dialog
          onClose={this.handleClose}
          onExit={this.handleExit}
          scroll='paper'
          aria-labelledby="scroll-dialog-title"
          {...other}
        >
          <DialogTitle id="scroll-dialog-title">Select category to detele</DialogTitle>
          <DialogContent>
            <MenuItems
            handleClickCategory = {this.handleClickCategory}
            categories = {this.props.categories}
            activeCategory = {this.state.activeDlgCategory}
            />
          </DialogContent>
          <div className={classes.topmargin}>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
            </Button>
              <Button onClick={this.handleDelete} disabled={this.state.activeDlgCategory === null} color="primary">
                Delete
            </Button>
            </DialogActions>
          </div>
          <MessageBoxDialog
            classes={this.classes}
            open={this.state.openMessageBox}
            onClose={this.handleMessageBoxClose.bind(this)}
            dialogTitle={this.state.MessageBoxTitle}
            dialogMessage={this.state.MessageBoxText}
          />
        </Dialog>
        <ShortInfoMessage
          classes={this.classes}
          open={this.state.openShortInfoMessage}
          onClose={this.handleShortInfoClose}
          dialogMessage={this.state.shortInfoText}
        />
      </div>
    );
  }
}

DeleteCategoryDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

export default withStyles(styles)(DeleteCategoryDialog);