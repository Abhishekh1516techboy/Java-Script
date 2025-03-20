// Map method...
console.log("Map...")
let arr = [66, 7, 33, 74, 99];
let a = arr.map((val) => {
    return val + 2;
});

console.log(a); // return new array without changing original array.

// Filter method...
console.log("Filter...")
let b = arr.filter((val) => {
    return val < 70;
});
console.log(b);

// Reduce method...
console.log("Reduce...")
let newArr = [88, 88, 35, 77, 69];
let n1 = newArr.reduce((acc, currVal ) => {
    return acc + currVal;
},0);
console.log(n1);