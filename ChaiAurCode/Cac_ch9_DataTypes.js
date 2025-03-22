// ---------Primitive DataTypes--------
// 7 types: String, Number, Boolean, null, undefiend, Symbol, BigInt...

const id = Symbol('123');
console.log(id);


// ---------Reference DataTypes (Non-Primitive)---------
// 3 types: Array, Objects, Functions...

// Array...
const heros = ["shaktiman", "hanuman", "krish"];
console.log(heros);
const h1 = String(heros); // conversion in String
console.log(h1);

// Object...
let myObj = {
    name: "Abhishekh",
    age: 22,
    phone: 6204609187,
}
console.log(myObj);
let h2 = Array(myObj); // conversion in Array
console.log(h2);

// Function...
function fun1 () {
    console.log("Hello i am function.")
}

fun1();
console.log( typeof fun1);