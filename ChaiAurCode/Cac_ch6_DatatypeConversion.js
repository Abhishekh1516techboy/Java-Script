let score = "33";
console.log(typeof score);
console.log(typeof (score));

let score1 = "33";
let valueInNumber = Number(score1);
console.log(typeof valueInNumber); // conversion string to Number...
console.log( valueInNumber); 

let score2 = "33abc";
let valueInNumber1 = Number(score2);
console.log(typeof valueInNumber1); // conversion string to Number...
console.log( valueInNumber1); // output not an Number...

let score3 = undefined;
let valueInNumber2 = Number(score3);
console.log(typeof valueInNumber2); // conversion string to Number...
console.log( valueInNumber2); // output not an Number...

let isLoggedIn = 1;
let booleanIsLoggedIn = Boolean(isLoggedIn);
console.log(booleanIsLoggedIn)

let snomeNumber = "22";
let stringNumber = String(snomeNumber);
console.log(typeof stringNumber);
console.log(stringNumber);