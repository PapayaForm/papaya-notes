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
import i18n from './i18n';


const styles = {
    root: {
        width: '100%',
        overflowX: 'auto',
    },
};


const ManageMenu = props => {
    return (
        <div>
            <ListSubheader inset>{i18n.t('Notes management')}</ListSubheader>
            <ListItem disabled={props.disabled} button onClick={() => props.handleClickAddCategory()}>
                <ListItemIcon>
                    <AddIcon />
                </ListItemIcon>
                <ListItemText primary={i18n.t('Add new category')} />
            </ListItem>
            <ListItem disabled={props.disabledDelete} button onClick={() => props.handleClickDeleteCategory()}>
                <ListItemIcon>
                    <DeleteIcon />
                </ListItemIcon>
            <ListItemText primary={i18n.t('Delete category')} />
            </ListItem>
            <ListItem disabled={true} button onClick={() => props.handleClickManageCategory()}>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={i18n.t('Manage')} />
            </ListItem>
        </div>
    );
}

ManageMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    disabledDelete: PropTypes.bool,
    handleClickAddCategory: PropTypes.func.isRequired,
    handleClickDeleteCategory: PropTypes.func.isRequired,
    handleClickManageCategory: PropTypes.func.isRequired,

};

export default withStyles(styles)(ManageMenu);