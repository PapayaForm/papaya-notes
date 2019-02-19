import {Data} from './Data';
import {CategoriesEnum} from './CategoriesEnum';




class ShoppingData extends Data {

    constructor(name, desc, state) {
        super(name, CategoriesEnum.eShopping, state)

        this.desc = desc;
    }
}

export default ShoppingData;
