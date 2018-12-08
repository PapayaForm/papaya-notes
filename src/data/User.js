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
}

export default User;