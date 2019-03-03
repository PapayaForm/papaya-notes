import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CategoryIcon from './CategoryIcon';
import Tooltip from '@material-ui/core/Tooltip';
import {GetCategoryName} from './data/CategoriesEnum';


const styles = {
  root: {
      width: '100%',
      overflowX: 'auto',
  },
};


const MainMenuItems = props => {
  const { activeCategory } = props;
  const { categories } = props;

  return (
    <div>
      {categories !== null ? categories.map((n, idx) => {
        return (
          <Tooltip key={idx} title={GetCategoryName(n.type) + ': ' + n.name} placement='right-end'>
            <ListItem
              key={idx}
              button onClick={() => props.handleClickCategory(n)}
              selected={activeCategory === n ? true : false}
            >
              <ListItemIcon>
                {activeCategory === n ? (CategoryIcon(n.type, 'inherit')) : (CategoryIcon(n.type, null))}
              </ListItemIcon>
              <ListItemText primary={n.name} />
            </ListItem>
          </Tooltip>
        );
      }) : ''}
    </div>
  );
}

MainMenuItems.propTypes = {
  activeCategory: PropTypes.object,
};

export default withStyles(styles)(MainMenuItems);