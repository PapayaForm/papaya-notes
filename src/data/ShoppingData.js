import Data from './Data';
import {CategoriesEnum} from './CategoriesEnum';




class ShoppingData extends Data {

    constructor(name, desc) {
        super(name, CategoriesEnum.eShopping)

        this.desc = desc;
    }
}

export default ShoppingData;
