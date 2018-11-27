import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CategoryIcon from './CategoryIcon';
import green from '@material-ui/core/colors/green';


const styles = {
  root: {
      width: '100%',
      overflowX: 'auto',
  },
  table: {
      minWidth: 700,
  },
  activeCategory: {
    backgroundColor: green[100],
    color: green[600],
  },
};


const MainMenuItems = props => {
  const { classes, activeCategory } = props;
  const { categories } = props.categories;

  return (
  <div>
    {categories.map(n => {
      return (
        <ListItem key={n.id} button onClick={() => props.handleClickCategory(n)}>
          <ListItemIcon>
            {CategoryIcon(n.icon)}
          </ListItemIcon>
          {activeCategory === n ? (
            <ListItemText primary={n.name} className={classes.activeCategory} />
          ) : (
            <ListItemText primary={n.name} />
          )}
        </ListItem>
      );
    })}
  </div>
  );
}

MainMenuItems.propTypes = {
  classes: PropTypes.object.isRequired,
  activeCategory: PropTypes.object,
};

export default withStyles(styles)(MainMenuItems);