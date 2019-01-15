import React from 'react';
import PropTypes from 'prop-types';
import MultiDataNewForm from './MultiDataNewForm';
import { CategoriesEnum } from './CategoriesEnum';


class CategoryDataMultiNewForm extends React.Component {

  static IsMultiAddEnabled(type) {
    switch(type) {
      case CategoriesEnum.eDashboard:
        return false;
      case CategoriesEnum.eShopping:
        return true;
      case CategoriesEnum.ePeople:
      case CategoriesEnum.eReports:
      case CategoriesEnum.eCalendar:
      case CategoriesEnum.eIntegrations:
      case CategoriesEnum.eAssignment:
        return false;
      default:
        return false;
    }
  }

  render() {
    const { classes, handleAddItem, type, ...other } = this.props;

    switch(this.props.type) {
      case CategoriesEnum.eDashboard:
        break;
      case CategoriesEnum.eShopping:
        return (
          <MultiDataNewForm 
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

CategoryDataMultiNewForm.propTypes = {
  classes: PropTypes.object,
  type: PropTypes.any,
  onClose: PropTypes.func.isRequired,
  handleAddItem: PropTypes.func.isRequired,
};

export default CategoryDataMultiNewForm;