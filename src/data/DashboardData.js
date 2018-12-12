import Data from './Data';
import {CategoriesEnum} from './CategoriesEnum';




class DashboardData extends Data {

    constructor(name, desc) {
        super(name, CategoriesEnum.eDashboard)

        this.desc = desc;
        this.cols = Math.random() * 10 < 5 ? 1 : 2;
        if(this.cols === 2) this.desc = 'takie długie dłuższe słowo nma mmm';
    }
}

export default DashboardData;
