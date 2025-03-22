function setUserName (userName) {
    this.userName = userName;
    console.log("setUserName called.");
};

function createNewUser (name, email, password) {
    setUserName.call(this, name);
    this.email = email;
    this.password = password;
};

const chai = new createNewUser("Abhi", "abhi@gmail.com", "@Abhi^123");
console.log(chai);