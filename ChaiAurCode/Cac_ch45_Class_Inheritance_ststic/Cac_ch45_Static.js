class User {
    constructor(userName) {
        this.userName = userName;
    }

    logMe () {
        console.log(`USERNAME: ${this.userName}`);
    }

    static createId () {
        return `@123`;
    }
}


const hitesh = new User("hitesh");
// console.log(hitesh.createId());

// Teacher class...
class Teacher extends User{
    constructor(userName, email) {
        super(userName);
        this.email = email;
    }
}

const iphone = new Teacher("iphone", "i@phone.com");
iphone.logMe();
// console.log(iphone.createId()) //static item can't call