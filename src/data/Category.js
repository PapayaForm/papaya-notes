import ShoppingData from './ShoppingData';
import {CategoriesEnum} from './CategoriesEnum'


class Category {

    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.dataItems = [];
    }

    AddData(name, desc) {
        let data = null;
        switch(this.type) {
            case CategoriesEnum.eDashboard:
                break;
            case CategoriesEnum.eShopping:
                data = new ShoppingData(name, desc);
                break;
            case CategoriesEnum.ePeople:
            case CategoriesEnum.eReports:
            case CategoriesEnum.eCalendar:
            case CategoriesEnum.eIntegrations:
            case CategoriesEnum.eAssignment:
                break;
            default:
                break;
        }
        if(data !== null) {
            this.dataItems.push(data);
        }
    }

    DrawPage(props) {
        switch(this.type) {
            case CategoriesEnum.eDashboard:
                return '';
            case CategoriesEnum.eShopping:
                return ShoppingData.DrawPage(props, this.dataItems);
            case CategoriesEnum.ePeople:
            case CategoriesEnum.eReports:
            case CategoriesEnum.eCalendar:
            case CategoriesEnum.eIntegrations:
            case CategoriesEnum.eAssignment:
                return '';
            default:
                return '';
        }
    }
}

export default Category;