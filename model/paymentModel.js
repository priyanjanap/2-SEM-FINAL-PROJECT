export  default class PaymentModel {
    get paymentID() {
        return this._paymentID;
    }

    set paymentID(value) {
        this._paymentID = value;
    }

    get LoanId() {
        return this._LoanId;
    }

    set LoanId(value) {
        this._LoanId = value;
    }

    get amount() {
        return this._amount;
    }

    set amount(value) {
        this._amount = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get paymentType() {
        return this._paymentType;
    }

    set paymentType(value) {
        this._paymentType = value;
    }
    constructor(paymentID,LoanId,amount,date,paymentType) {
        this._paymentID = paymentID;
        this._LoanId = LoanId;
        this._amount = amount;
        this._date = date;
        this._paymentType = paymentType;
    }

}