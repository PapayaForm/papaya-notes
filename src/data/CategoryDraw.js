import React from 'react';
import ShoppingDataDraw from './ShoppingDataDraw';
import { CategoriesEnum } from './CategoriesEnum';


class CategoryDraw extends React.Component {

    handleMoveElemInArray = (oldIndex, newIndex) => {
        this.props.activeCategory.MoveDataItem(oldIndex, newIndex);
        this.props.forceTableRefresh();
    }

    render() {
        const { classes } = this.props;

        switch (this.props.activeCategory.type) {
            case CategoriesEnum.eDashboard:
                return null;
            case CategoriesEnum.eShopping:
                return (
                    <ShoppingDataDraw 
                        classes={classes} 
                        tableData={this.props.activeCategory.dataItems} 
                        removeItem={this.props.removeItem}
                        moveElemInArray={this.handleMoveElemInArray}/>
                ); 
            case CategoriesEnum.ePeople:
            case CategoriesEnum.eReports:
            case CategoriesEnum.eCalendar:
            case CategoriesEnum.eIntegrations:
            case CategoriesEnum.eAssignment:
                return null;
            default:
                return null;
        }
    }
}

export default CategoryDraw;