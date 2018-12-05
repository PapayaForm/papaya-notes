import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {CategoriesEnum} from './data/CategoriesEnum';


const CategoryIcon = (type, color) => {
  let iconColor = 'inherit';
  if(color !== null && color !== '')
    iconColor = color;

  switch(type) {
    case CategoriesEnum.eDashboard:
      return (<DashboardIcon color={iconColor}/>);
    case CategoriesEnum.eShopping:
      return (<ShoppingCartIcon color={iconColor}/>);
    case  CategoriesEnum.ePeople:
      return (<PeopleIcon  color={iconColor}/>);
    case CategoriesEnum.eReports:
      return (<BarChartIcon  color={iconColor}/>);
    case CategoriesEnum.eCalendar:
      return (<CalendarTodayIcon  color={iconColor}/>);
    case CategoriesEnum.eIntegrations:
      return (<LayersIcon  color={iconColor}/>);
    case CategoriesEnum.eAssignment:
      return (<AssignmentIcon  color={iconColor}/>);
    default:
      return '';
  }
}

export default CategoryIcon;