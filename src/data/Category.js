import DashboardData from './DashboardData';
import ShoppingData from './ShoppingData';
import {CategoriesEnum} from './CategoriesEnum'
import {arrayMove} from 'react-sortable-hoc';
import {DataStateEnum} from './Data';


class Category {

    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.dataItems = [];
    }

    AddData(name, desc, state = DataStateEnum.eActive) {
        let data = null;
        switch(this.type) {
            case CategoriesEnum.eDashboard:
                data = new DashboardData(name, desc, state);
                break;
            case CategoriesEnum.eShopping:
                data = new ShoppingData(name, desc, state);
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
            if(this.dataItems[idx].state === DataStateEnum.eActive)
                this.dataItems[idx].state = DataStateEnum.eDone;
            else if(this.dataItems[idx].state === DataStateEnum.eDone)
                this.dataItems.splice(idx, 1);
        }
    }

    RestoreData(idx) {
        if(idx >= 0 && idx < this.dataItems.length) {
            if(this.dataItems[idx].state === DataStateEnum.eDone)
                this.dataItems[idx].state = DataStateEnum.eActive;
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
                    objectToInstantiate.AddData(objectState.dataItems[i].name, objectState.dataItems[i].desc, objectState.dataItems[i].state);
                }
            }
        }
        return objectToInstantiate;
    }

    static ReturnCategoryFromCollectionForGivenState(objectState, arrCategories) {
        if(objectState) {
            for(let i = 0; i < arrCategories.length; i++) {
                let category = arrCategories[i];
                if(objectState.name === category.name && objectState.type === category.type) {
                    if(JSON.stringify(category.dataItems) === JSON.stringify(objectState.dataItems)) {
                        return category;
                    }
                }
            }
        }
        return null;
    }
}


export default Category;