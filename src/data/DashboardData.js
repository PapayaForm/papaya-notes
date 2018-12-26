import Data from './Data';
import {CategoriesEnum} from './CategoriesEnum';




class DashboardData extends Data {

    constructor(name, desc) {
        super(name, CategoriesEnum.eDashboard)

        this.desc = desc;
    }
}

export default DashboardData;
