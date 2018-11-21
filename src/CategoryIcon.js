import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';


const CategoryIcon = icon => {
  if (icon === 'Dashboard')
    return (<DashboardIcon />);
  else if (icon === 'Shopping')
    return (<ShoppingCartIcon />);
  else if (icon === 'People')
    return (<PeopleIcon />);
  else if (icon === 'Reports')
    return (<BarChartIcon />);
  else if (icon === 'Calendar')
    return (<CalendarTodayIcon />);
  else if (icon === 'Integrations')
    return (<LayersIcon />);
  else if (icon === 'Assignment')
    return (<AssignmentIcon />);
}

export default CategoryIcon;