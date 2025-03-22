// console.log(document.cookie);
// document.cookie = "name: Abhishekh Kumar";
// document.cookie = "userName: Abhishekh1516techboy";
// document.cookie = "name: roushan Kumar";
let key = prompt("Enter your key:");
let vlaue = prompt("Enter your value:");
// document.cookie = `${key} = ${vlaue}`; // set simple cookie without any special character...
document.cookie = `${encodeURIComponent(key)} = ${encodeURIComponent(vlaue)}`; // set cookie including special character...
console.log(document.cookie);