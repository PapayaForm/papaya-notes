import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CategoryIcon from './CategoryIcon';



const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      minWidth: 120,
    },
    topmargin: {
        marginTop: theme.spacing.unit * 4,
      },
  });


class AddCategoryDialog extends React.Component {

  state = {
    categoryType: '',
    categoryName: '',
  };

  handleClose = () => {
    this.props.onClose();
    this.setState({categoryName: ''});
    this.setState({categoryType: ''});
  };

  handleAdd = () => {
    if(this.props.handleAddCategoryDialogAddCategory(this.state.categoryName, this.state.categoryType) === true)
      this.handleClose();
    else{
      // TODO: 
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, onClose, handleAddCategoryDialogAddCategory,  ...other } = this.props;

    return (
      <div >
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          {...other}
        >
          <DialogTitle id="form-dialog-title">Add new category</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can add new category for notes and define its type.<br/>
            </DialogContentText>
            <div className={classes.topmargin}>
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">Category Type</InputLabel>
                    <Select
                        value={this.state.categoryType}
                        onChange={this.handleChange}
                        inputProps={{
                        name: 'categoryType',
                        id: 'categoryTypeId',
                        }}
                    >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Dashboard'}><ListItemIcon>{CategoryIcon('Dashboard')}</ListItemIcon> Dashboard</MenuItem>
                        <MenuItem value={'Shopping'}><ListItemIcon>{CategoryIcon('Shopping')}</ListItemIcon>Shopping</MenuItem>
                        <MenuItem value={'People'}><ListItemIcon>{CategoryIcon('People')}</ListItemIcon>People</MenuItem>
                        <MenuItem value={'Reports'}><ListItemIcon>{CategoryIcon('Reports')}</ListItemIcon>Reports</MenuItem>
                        <MenuItem value={'Calendar'}><ListItemIcon>{CategoryIcon('Calendar')}</ListItemIcon>Calendar</MenuItem>
                        <MenuItem value={'Integrations'}><ListItemIcon>{CategoryIcon('Integrations')}</ListItemIcon>Integrations</MenuItem>
                        <MenuItem value={'Assignment'}><ListItemIcon>{CategoryIcon('Assignment')}</ListItemIcon>Assignment</MenuItem>
                    </Select>
                </FormControl>
            </form>
            <TextField
              className={classes.root}
              name={'categoryName'}
              value={this.state.categoryName}
              onChange={this.handleChange}
              margin="dense"
              id="name"
              label="Category name"
              type="text"
              fullWidth
            />
            </div>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={this.handleClose}
              color="primary" >
              Cancel
            </Button>
            <Button 
              onClick={this.handleAdd}
              disabled={this.state.categoryName === '' || this.state.categoryType === ''}
              color="primary" >
              Add Category
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AddCategoryDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
  };

export default withStyles(styles)(AddCategoryDialog);