const DataStateEnum = Object.freeze({
    "eActive": 1,
    "eDone": 2,
});


class Data {

    constructor(name, type, state) {
        this.name = name;
        this.type = type;
        this.state = state;
    }
}

export { Data, DataStateEnum };