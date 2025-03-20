// this keyWord...
const user = {
    userName: "ABhishekh",
    price: 199,

    welcomeMsg: function () {
        console.log(`${this.userName}, welcome to website.`)
        console.log(this);
    }
}

user.welcomeMsg();
user.userName = "Hitesh";
user.welcomeMsg();

console.log(this)


function chai () {
    let usname = "ankit";
    console.log(this);
}

chai();

// --------Arrow Function---------

const coffee = () => {
    let usname = "ankit";
    console.log(this)
}

coffee();
