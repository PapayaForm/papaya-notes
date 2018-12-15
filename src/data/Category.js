import DashboardData from './DashboardData';
import ShoppingData from './ShoppingData';
import {CategoriesEnum} from './CategoriesEnum'
import {arrayMove} from 'react-sortable-hoc';


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
                data = new DashboardData(name, desc);
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

    DeleteData(idx) {
        if(idx >= 0 && idx < this.dataItems.length) {
            this.dataItems.splice(idx, 1);
        }
    }

    MoveDataItem(oldIndex, newIndex) {
        let tmpArray = arrayMove(this.dataItems, oldIndex, newIndex);
        this.dataItems = tmpArray;
    }

    static SerializeFromStorage(objectState) {
        let objectToInstantiate = null;
        if(objectState) {
            objectToInstantiate = new Category(objectState.name, objectState.type);
            if(objectState.dataItems && objectState.dataItems.length > 0) {
                for (let i = 0; i < objectState.dataItems.length; i++) {
                    objectToInstantiate.AddData(objectState.dataItems[i].name, objectState.dataItems[i].desc);
                }
            }
        }
        return objectToInstantiate;
    }
}


export default Category;