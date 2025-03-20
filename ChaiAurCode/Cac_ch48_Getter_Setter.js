class User {
    constructor(email, phoneNumber, password) {
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }

    set password (pass) {
        this._password = pass;
    }

    get password () {
        return `${this._password}abcdef`;
    }

    set phoneNumber (phone) {
        this._phoneNumber = phone;
    }

    get phoneNumber () {
        return `Phone No. last 4 digit is: ${this._phoneNumber.toString().slice(6)}`;
    }

    set email (mail) {
        this._email = mail;
    }

    get email () {
        return this._email.toUpperCase();
    }
}

const hitesh = new User("chaiaurcode@gmail.com", 6204609187, "@Knvpk6567g");
console.log(hitesh.email);
console.log(hitesh.phoneNumber);
console.log(hitesh.password);