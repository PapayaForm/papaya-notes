import Category from "./Category";

class User {

    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.categories = [];
    }

    get isPassword() {
        return this.password !== '';
    }

    ValidatePassword(password) {
        return this.password === password;
    }

    static SerializeFromStorage(objectState) {
        let objectToInstantiate = null;
        if(objectState) {
            objectToInstantiate = new User(objectState.email, objectState.password);
            if(objectState.categories && objectState.categories.length > 0) {
                for (let i = 0; i < objectState.categories.length; i++) {
                    let tmpCategory = Category.SerializeFromStorage(objectState.categories[i]);
                    if(tmpCategory)
                        objectToInstantiate.categories.push(tmpCategory);
                }
            }
        }
        return objectToInstantiate;
    }
}

export default User;