const CategoriesEnum = Object.freeze({
    "eDashboard": 1,
    "eShopping": 2,
    "ePeople": 3,
    "eReports": 4,
    "eCalendar": 5,
    "eIntegrations": 6,
    "eAssignment": 7,
});


const ValidateCategory = value => { 

    switch(value) {
        case CategoriesEnum.eDashboard:
        case CategoriesEnum.eShopping:
        case CategoriesEnum.ePeople:
        case CategoriesEnum.eReports:
        case CategoriesEnum.eCalendar:
        case CategoriesEnum.eIntegrations:
        case CategoriesEnum.eAssignment:
            return true;
        default:
            return false;
        }
}



export {CategoriesEnum, ValidateCategory};