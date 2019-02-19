import {Data} from './Data';
import {CategoriesEnum} from './CategoriesEnum';




class DashboardData extends Data {

    constructor(name, desc, state) {
        super(name, CategoriesEnum.eDashboard, state)

        this.desc = desc;
    }
}

export default DashboardData;
