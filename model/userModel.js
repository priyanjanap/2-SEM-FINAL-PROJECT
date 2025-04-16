export  default class UserModel{
    get user_id() {
        return this._user_id;
    }

    set user_id(value) {
        this._user_id = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get role() {
        return this._role;
    }

    set role(value) {
        this._role = value;
    }


    constructor(user_id, email, password, role) {
        this._user_id = user_id;
        this._email = email;
        this._password = password;
        this._role = role;
    }
}