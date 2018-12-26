import React from 'react';
import PropTypes from 'prop-types';
import DashboardDataNewForm from './DashboardDataNewForm';
import ShoppingDataNewForm from './ShopingDataNewForm';
import { CategoriesEnum } from './CategoriesEnum';


class CategoryDataNewForm extends React.Component {


  render() {
    const { classes, handleAddItem, type, ...other } = this.props;

    switch(this.props.type) {
      case CategoriesEnum.eDashboard:
        return (
          <DashboardDataNewForm 
            classes = {classes} 
            onClose = {this.props.onClose}
            handleAddItem = {handleAddItem}
            {...other}/>
        );
      case CategoriesEnum.eShopping:
        return (
          <ShoppingDataNewForm 
            classes = {this.props.classes} 
            onClose = {this.props.onClose}
            handleAddItem = {this.props.handleAddItem}
            {...other}/>
        );
      case CategoriesEnum.ePeople:
      case CategoriesEnum.eReports:
      case CategoriesEnum.eCalendar:
      case CategoriesEnum.eIntegrations:
      case CategoriesEnum.eAssignment:
          break;
      default:
          break;
    }
    return null;
  }
}

CategoryDataNewForm.propTypes = {
  classes: PropTypes.object,
  type: PropTypes.any,
  onClose: PropTypes.func.isRequired,
  handleAddItem: PropTypes.func.isRequired,
};

export default CategoryDataNewForm;