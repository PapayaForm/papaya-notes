import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CategoryDraw from "./data/CategoryDraw";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
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

  handleAddItem = () => {
    if(this.props.activeCategory !== null) {
      this.props.activeCategory.AddData('ala', 'makota makota');
      this.setState({refresh: !this.state.refresh});
    }
  }

  handleRemoveItem = idx => {
    if(this.props.activeCategory !== null) {
      this.props.activeCategory.DeleteData(idx);
      this.setState({refresh: !this.state.refresh});
    }
  }

  render() {
    const { classes } = this.props;

    if (this.props.activeCategory === null) return null;
    else return (
      <div>
        <CategoryDraw classes={classes} activeCategory={this.props.activeCategory} removeItem={this.handleRemoveItem}/>
        <Fab
          className={classes.fab}
          onClick={this.handleAddItem}
          color='primary'>
          <AddIcon />
        </Fab>
      </div>
    )
  }
}

MyTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableData: PropTypes.array.isRequired,
  activeCategory: PropTypes.object,
};

export default withStyles(styles)(MyTable);