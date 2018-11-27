import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';


const styles = {
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
};


const ManageMenu = props => {

    return (
        <div>
            <ListSubheader inset>Notes management</ListSubheader>
            <ListItem button onClick={() => props.handleClickAddCategory()}>
                <ListItemIcon>
                    <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add new category" />
            </ListItem>
            <ListItem button onClick={() => props.handleClickDeleteCategory()}>
                <ListItemIcon>
                    <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary="Delete category" />
            </ListItem>
            <ListItem button onClick={() => props.handleClickSettings()}>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Manage" />
            </ListItem>
        </div>
    );
}

ManageMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ManageMenu);