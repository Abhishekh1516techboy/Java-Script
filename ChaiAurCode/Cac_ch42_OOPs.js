// -----------Object Literals----------
const user = {
    userName: "Abhishekh1516techboy",
    loginCount: 8,
    signedIn: true,

    getUserDetalis: function () {
        // console.log("Got user details from database");
        console.log(`User Name: ${this.userName}`);
        // console.log(this); // return objects...
    }

};
console.log(user.userName);
console.log(user.getUserDetalis());

// -------------constructor user function-----------
function users (userName, loginCount, isLoggedIn) {
    this.userName = userName;
    this.loginCount = loginCount;
    this.isLoggedIn = isLoggedIn;

    this.greetings = function () {
        console.log(`Welocme ${this.userName}`);
    };

    return this;
};

// ----create user from instense of users----

// const userOne = users("Hitesh", 6, true); // code is overRide values bcz new KeyWord not used...
// const userTwo = users("chaiAurCode", 4, false);
// console.log(userOne);

// ----create new user from instense of users using new KeyWord----
const userOne = new users("Hitesh", 6, true);
const userTwo = new users("chaiAurCode", 4, false);
console.log(userOne);
console.log(userTwo);