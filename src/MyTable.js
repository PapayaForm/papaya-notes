import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CategoryDraw from "./data/CategoryDraw";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  fabAdd: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    //bottom: theme.spacing.unit * 2,
    //right: theme.spacing.unit * 2,
  },
  fabMenu: {
    margin: 0,
    top: 'auto',
    right: 80,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    //bottom: theme.spacing.unit * 2,
    //right: theme.spacing.unit * 2,
  },
});


class MyTable extends React.Component {

  state = {
    refresh: true}

  forceTableRefresh = () => {
    this.setState({refresh: !this.state.refresh});
  }

  handleMenu = () => {
    if(this.props.activeCategory !== null) {
      // TODO
      this.forceTableRefresh();
    }
  }

  handleRemoveItem = idx => {
    if(this.props.activeCategory !== null) {
      this.props.activeCategory.DeleteData(idx);
      this.forceTableRefresh();
    }
  }

  render() {
    const { classes } = this.props;

    if (this.props.activeCategory === null) return null;
    else {
      const isNotEmptyList = this.props.activeCategory.dataItems.length > 0;
      const tooltipAddText = 'Add new item to the shopping list';
      const tooltipStorageText = isNotEmptyList ? 'Items menu' : 'Items menu';
      return (
        <div>
          <CategoryDraw 
            classes={classes} 
            activeCategory={this.props.activeCategory} 
            removeItem={this.handleRemoveItem}
            forceTableRefresh={this.forceTableRefresh}/>
            
          <Tooltip title={tooltipAddText}>
            <Fab
              className={classes.fabAdd}
              onClick={this.props.handleAddNewCategoryItemClick}
              color='primary'>
              <AddIcon />
            </Fab>
          </Tooltip>
          <Tooltip title={tooltipStorageText}>
            <Fab
              className={classes.fabMenu}
              onClick={this.handleMenu}
              color='primary'
              disabled>
              {isNotEmptyList ? ( <MenuIcon />) : (<MenuIcon />)}
            </Fab>
          </Tooltip>
        </div>
      );
    }
  }
}

MyTable.propTypes = {
  classes: PropTypes.object.isRequired,
  activeCategory: PropTypes.object,
  handleAddNewCategoryItemClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(MyTable);