// User class...
class User {
    constructor(userName) {
        this.userName = userName;
    }

    logMe () {
        console.log(`USERNAME is ${this.userName}`)
    }
}

// Teacher class extends User...
class teacher extends User {
    constructor(userName, email, password) {
        super(userName);
        this.email = email;
        this.password = password;
    }

    addCourse () {
        console.log(`A new course was added by ${this.userName}`)
    }
}

// create object...
const chai = new teacher("chai", "chai@123gmail.com", "@chai^123");
chai.addCourse();
chai.logMe();

const Tea = new User("Tea");
Tea.logMe();