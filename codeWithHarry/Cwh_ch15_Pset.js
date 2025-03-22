// Q1. what will the following print in js?
// clg("har\"".length);
console.log("har\"".length);

// Q2. Explore the incudes, startWith, and endsWith function of a string.
let para = "Hi my name is abhishekh kumar";
console.log(para.includes("abhishekh"))
console.log(para.startsWith("hello"));
console.log(para.endsWith("kumar"));

// Q3. write a program to convert a given string to lowercase.
let str = "KRISHNA JI";
console.log(str.toLocaleLowerCase());

// Q4. Extract the ammount of this string, "Please give rs 1000".
let amount = "Please give rs 1000";
console.log(amount.slice(15, 19));
