// -----------array destructring------------
let arr = [3, 5, 8, 2, 6,];
let [a, b] = arr; // destructring...
console.log(a, b);

let [c, d, ...rest] = arr;
console.log(c, d, rest); // destructring and reset...

let [e, , f, ...reset] = arr;
console.log(e, f, reset); // destructring and reset...
console.log(reset);

// ---------------Object destructring-----------
let obj = { g: 44, h: 77, i: 7, j: 11 }
let { g, h, j, ...resets } = obj; // destructring...
console.log(g, h, resets);
console.log(resets);

// ----------------spread Operator---------------
// spread operator with Array...
let arr1 = [2, 7, 9];

let obj1 = { ...arr1 }
console.log(obj1);

function sum (v1, v2, v3) {
    return v1 + v2 + v3;
}
console.log(sum(...arr1));

// spread operator with object...
let obj2 = {
    name: "Abhishekh",
    company: "technology Fire",
    address: "Bihar"
}

console.log(obj2);
console.log({ ...obj2, name: "Ashutosh", company: "rice mill" });