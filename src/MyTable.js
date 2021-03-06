import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CategoryDraw from "./data/CategoryDraw";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import LibraryAdd from '@material-ui/icons/LibraryAdd'
import MenuIcon from '@material-ui/icons/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import CategoryDataMultiNewForm from './data/CategoryDataMultiNewForm';
import i18n from './i18n';

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
  fabMultiAdd: {
    margin: 0,
    top: 'auto',
    right: 80,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    //bottom: theme.spacing.unit * 2,
    //right: theme.spacing.unit * 2,
  },
  fabMenu: {
    margin: 0,
    top: 'auto',
    right: 140,
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

  handleRestoreItem = idx => {
    if(this.props.activeCategory !== null) {
      this.props.activeCategory.RestoreData(idx);
      this.forceTableRefresh();
    }
  }

  render() {
    const { classes } = this.props;

    if (this.props.activeCategory === null) return null;
    else {
      const isNotEmptyList = this.props.activeCategory.dataItems.length > 0;
      const tooltipAddText = i18n.t('Add new item to the shopping list');
      const tooltipMultiAddText = i18n.t('Add list of new items to the shopping list in one shot');
      let bMuliAddDisabled = !CategoryDataMultiNewForm.IsMultiAddEnabled(this.props.activeCategory.type);
      //const tooltipStorageText = isNotEmptyList ? i18n.t('Items menu') : i18n.t('Items menu');
      return (
        <div>
          <CategoryDraw 
            classes={classes} 
            activeCategory={this.props.activeCategory} 
            removeItem={this.handleRemoveItem} 
            restoreItem={this.handleRestoreItem}
            forceTableRefresh={this.forceTableRefresh}/>
            
          <Tooltip title={tooltipAddText}>
            <Fab
              className={classes.fabAdd}
              onClick={this.props.handleAddNewCategoryItemClick}
              color='primary'>
              <AddIcon />
            </Fab>
          </Tooltip>
          {bMuliAddDisabled ? 
            <Fab
              className={classes.fabMultiAdd}
              disabled={true}
              color='primary'>
              <LibraryAdd />
            </Fab>
            : 
            <Tooltip title={tooltipMultiAddText}>
              <Fab
                className={classes.fabMultiAdd}
                onClick={this.props.handleMultiAddNewCategoryItemClick}
                color='primary'>
                <LibraryAdd />
              </Fab>
            </Tooltip>
          }
          {/*<Tooltip title={tooltipStorageText}>*/}
            <Fab
              className={classes.fabMenu}
              onClick={this.handleMenu}
              color='primary'
              disabled>
              {isNotEmptyList ? ( <MenuIcon />) : (<MenuIcon />)}
            </Fab>
          {/*</Tooltip>*/}
        </div>
      );
    }
  }
}

MyTable.propTypes = {
  classes: PropTypes.object.isRequired,
  activeCategory: PropTypes.object,
  handleAddNewCategoryItemClick: PropTypes.func.isRequired,
  handleMultiAddNewCategoryItemClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(MyTable);