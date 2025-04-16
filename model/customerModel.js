export  default class customerMode{
    get userID() {
        return this._userID;
    }

    set userID(value) {
        this._userID = value;
    }

    get userName() {
        return this._userName;
    }

    set userName(value) {
        this._userName = value;
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

    get NCC() {
        return this._NCC;
    }

    set NCC(value) {
        this._NCC = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }
    constructor(userID,userName,accountType,accountNumber,NCC,email,) {
        this._userID = userID;
        this._userName = userName;
        this._accountType = accountType;
        this._accountNumber = accountNumber;
        this._NCC = NCC;
        this._email = email;
    }
}