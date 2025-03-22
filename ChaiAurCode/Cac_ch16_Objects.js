// object literals...

const mySymbol = Symbol("key1");

const jsUser = {
    name: "Abhishekh",
    "full Name": "Abhishekh kumar",
    [mySymbol]: "key1",
    age: 22,
    phone: 6204609187,
    location: "Patna",
    email: "abhishekhkumar1516@gmail.com",
    isLoggedIn: true,
}

console.log(jsUser);
console.log(jsUser.email);
console.log(jsUser["email"]);
console.log(jsUser["full Name"]);
console.log(jsUser[mySymbol]);

jsUser.greeting1 = function () {
    console.log("Hello js user.");
}

jsUser.greeting1();

jsUser.greeting2 = function () {
    console.log(`Hello js user,${this["full Name"]}, your email is ${this.email}`);
}

jsUser.greeting2();
