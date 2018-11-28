import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';


const CategoryIcon = (icon, color) => {
  let iconColor = 'inherit';
  if(color !== null && color !== '')
    iconColor = color;

  if (icon === 'Dashboard')
    return (<DashboardIcon color={iconColor}/>);
  else if (icon === 'Shopping')
    return (<ShoppingCartIcon color={iconColor}/>);
  else if (icon === 'People')
    return (<PeopleIcon  color={iconColor}/>);
  else if (icon === 'Reports')
    return (<BarChartIcon  color={iconColor}/>);
  else if (icon === 'Calendar')
    return (<CalendarTodayIcon  color={iconColor}/>);
  else if (icon === 'Integrations')
    return (<LayersIcon  color={iconColor}/>);
  else if (icon === 'Assignment')
    return (<AssignmentIcon  color={iconColor}/>);
}

export default CategoryIcon;