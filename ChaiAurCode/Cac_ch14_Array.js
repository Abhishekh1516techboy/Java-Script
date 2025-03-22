const myArr = [4, 0, 7, 5, 6];
const myHeros = ["Shaktiman", "Krish"];
const myNum = new Array(1, 5, 9, 7, 6);

console.log(myHeros[1]);
console.log(myNum[1]);

// Array methods...
myArr.push(11);// add Last...
myArr.push(47);
myArr.pop(); // remove last...
myArr.unshift(19); // add startinng...
myArr.shift(); // remove startinng...
console.log(myArr);
console.log(myArr.indexOf(11));

const newArr = myArr.join(myNum);
console.log(newArr);

console.log("\nOriginal: ", myArr);
const myNum1 = myArr.slice(1, 3); // slice use for copy values...
console.log("Slice", myNum1);
console.log("After Slice", myArr, "\n");

console.log("Original: ", myArr);
const myNum2 = myArr.splice(1, 3);// splice use for cut values...
console.log("Splice: ", myNum2);
console.log("after splice: ", myArr);