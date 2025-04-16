export default class UserDetailsModel {
    constructor(account_type, account_number, ncc, full_name, email) {
        this.accountType = account_type;
        this.accountNumber = account_number;
        this.NIC = ncc;
        this.fullName = full_name;
        this.email = email;
    }

    get accountType() {
        return this._accountType;
    }

    set accountType(value) {
        this._accountType = value;
    }

    get accountNumber() {
        return this._accountNumber;
    }

    set accountNumber(value) {
        this._accountNumber = value;
    }

  get NIC() {
        return this._NIC;
    }

    set NIC(value) {
        this._NIC = value;
    }

    get fullName() {
        return this._fullName;
    }

    set fullName(value) {
        this._fullName = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }
}
