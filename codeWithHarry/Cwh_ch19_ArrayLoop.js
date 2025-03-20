let num = [24, 47, 17, 88, 26, 22, 85];
// for loop...
console.log("For loop");
let l = num.length;
for (let i = 0; i < l; i++) {
    console.log(num[i]);
}

// forEach loop...
console.log("ForEach loop");
num.forEach((e) => {
    console.log(e + 2);
});

// Array.from...
console.log("Array.from");
let name = "Abhishekh";
let arr = Array.from(name);
console.log(typeof name, name);
console.log(typeof arr, arr);
arr.forEach((e) => console.log(e) );

// for-of-Loop...
let nums = [8, 7, 11, 88, 16, 22, 82];
console.log("for-of-loop");
for(let item of nums) {
  console.log(item);
}

// for-in-loop...
console.log("for-in-loop");
for(let i in nums) {
  console.log(i,":", nums[i]);
}