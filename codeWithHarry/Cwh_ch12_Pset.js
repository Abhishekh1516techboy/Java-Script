// Q.1 Write a program to print the marks of student in an Object usinf for loop.
let marks = {
    harry: 98,
    roushan: 70,
    aakash: 75,
    monika: 83
}
console.log("\nUsing for loop...")
for (i = 0; i < Object.keys(marks).length; i++) {
    console.log(Object.keys(marks)[i], "=", marks[Object.keys(marks)[i]]);
}


//Q.2 Write the program solve Q.1 problrm using for in loop.
console.log("\nUsing for in loop...")
for (let key in marks) {
    console.log(key, "=", marks[key])
}

//Q.3 check number input is correct or not.
let correctNum = 89;
let n;
while(n != correctNum){
    n=89; // enter number...
}
console.log("you are entered correct num.")