// ES6 javaScript...

// Create User class...
class User {
    // User constructor...
    constructor(userName, email, password) {
        this.userName = userName;
        this.email = email;
        this.password = password;
    }

    encryptPassword () {
        return `${this.password}^abc`;
    }

    changeUserName () {
        return `${this.userName.toUpperCase()}`
    }
}

// create object of User class...
const chai = new User("chai", "chai@gmail.com", "123");
console.log(chai.encryptPassword());
console.log(chai.changeUserName());


// -------------behind the seen-----------
// Create User class...
function Users (userName, email, password) {
    this.userName = userName;
    this.email = email;
    this.password = password;
}

// set method using prototype...
Users.prototype.encryptPassword = function () {
    return `${this.password}^abc`;
}

Users.prototype.changeUserName = function () {
    return `${this.userName.toUpperCase()}`
}

// create new oject using Users class...
const tea = new Users("tea", "tea@gmail.com", "456");
console.log(tea.encryptPassword()); // call encryptPassword...
console.log(tea.changeUserName());  // call changeUserName...