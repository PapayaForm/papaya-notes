import '../i18n';
import i18n from '../i18n';


const CategoriesEnum = Object.freeze({
    "eDashboard": 1,
    "eShopping": 2,
    "ePeople": 3,
    "eReports": 4,
    "eCalendar": 5,
    "eIntegrations": 6,
    "eAssignment": 7,
});


const GetCategoryName = value => { 

    switch(value) {
        case CategoriesEnum.eDashboard:
            return i18n.t('Dashboard');
        case CategoriesEnum.eShopping:
            return i18n.t('Shopping list');
        case CategoriesEnum.ePeople:
            return i18n.t('People');
        case CategoriesEnum.eReports:
            return i18n.t('Reports');
        case CategoriesEnum.eCalendar:
            return i18n.t('Calendar');
        case CategoriesEnum.eIntegrations:
            return i18n.t('Integrations');
        case CategoriesEnum.eAssignment:
            return i18n.t('Assignment');
        default:
            return '';
        }
}


const ValidateCategory = value => { 

    switch(value) {
        case CategoriesEnum.eDashboard:
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



export {CategoriesEnum, GetCategoryName, ValidateCategory};