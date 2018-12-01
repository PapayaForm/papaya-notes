import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CategoryIcon from './CategoryIcon';


const styles = {
  root: {
      width: '100%',
      overflowX: 'auto',
  },
  table: {
      minWidth: 700,
  },
};


const MainMenuItems = props => {
  const { activeCategory } = props;
  const { categories } = props;

  return (
  <div>
    {categories !== null ? categories.map((n, idx) => {
      return (
        <ListItem 
          key={idx} 
          button onClick={() => props.handleClickCategory(n)}
          selected = {activeCategory === n ? true : false}
          >
          <ListItemIcon>
            {activeCategory === n ? (CategoryIcon(n.icon, 'inherit')) : (CategoryIcon(n.icon, null))}
          </ListItemIcon>
          <ListItemText primary={n.name}/>
        </ListItem>
      );
    }) : ''}
  </div>
  );
}

MainMenuItems.propTypes = {
  activeCategory: PropTypes.object,
};

export default withStyles(styles)(MainMenuItems);