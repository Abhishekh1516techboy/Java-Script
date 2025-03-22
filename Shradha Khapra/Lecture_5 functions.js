//=======Functions & Methods=======

//.....Function....

function myFun(){ 
  cosole.log("Welcome to apna college");
    cosole.log("Welcome to coding world");
    cosole.log("Welcome to js Tutorial");
}

myFun(); //function call


//Parameter in function...

function myFun(msg){
	console.log(msg);
}
myFun("hiii i am Programmer"); //Arguments pass


function sum(a,y){
	console.log(a+b);
}
sum(5+8); //Argumenr pass


//''''Arrow function......


//add..
const arrowSum = (a, b)=>{
	console.log(a+b);
};

arrowSum(5 ,8);

//multiple..

const arrowMul = (a, b)=>{
	console.log(a*b);
};

arrowMul(4, 5);


//Q.1.. create function take string value and return vowel ..

function countVowlels(str){
	let count = 0;
  for(const char of str){
	console.log(char);
	if(char==="a" || char==="e" || char==="i" || 	char==="o" || char==="u"){
	count++;
}
}
return count;
}


//Using arrow function same work....


const countVowels = (str) =>{
  	let count = 0;
 	 for(const char of str){
	console.log(char);
	if(char==="a" || char==="e" || char==="i" || 	char==="o" || char==="u"){
	count++;
}
}
return count;
};



//------------ForEach loop--------------
//arr.forEach(callBackFunction);


//using arrow  function..
//1.
let arr = [1,2,3,4,5];

arr.forEach((val)=>{
	console.log(val);
});


//2.
let city= ["patna","mumbai","pune","kolkata"];

city.forEach((val)=>{
	console.log(val); //print city name
});


//3.
let city= ["patna","mumbai","pune","kolkata"];

city.forEach((val)=>{
	console.log(val.toUpperCase()); // print UpperCae
});


//4.
let arr = ["patna","mumbai","pune","kolkata"];

arr.forEach((val, idx)=>{
	console.log(val, idx); //value and index num
});


Q3. for a given array number, print the square of  each value using the forEach Loop...


let num = [2,4,6,8,5];

num.forEach((num)=>{
	console.log(num*num);//Return square of numbers
});


//======Methods========
//map method...

//1.
let num = [2,4,6,8,5];

num.map(((val)=>{
	console.log(val);
});

//2.
let num = [2,4,6,8,5];

let newArr = num.map((val)=>{
	return val * 2;
});
console.log(newArr);


//filter method...

//1.
let num=[1,2,3,4,5,6,7,8,9];

let evenNum = num.filter((val)=>{
	return val %2 === 0;
});
console.log(evenNum); //print even num..


//2.
let num=[1,2,3,4,5,6,7,8,9];

let oddNum = num.filter((val)=>{
	return val %2 !== 0;
});
console.log(oddNum); //print odd num..



//3.
let num=[1,2,3,4,5,6,7,8,9];

let Num = num.filter((val)=>{
	return val >3;
});
console.log(Num); //print greater then 3 ..


//Reduce method...

//1.
let arr =[1,2,3,4,5];

const output = arr.reduce((result, current)=>{
	return result+current;
});
console.log(output);//addition of array numbers...


//2.
let arr =[11,23,38,44,56];

const output = arr.reduce((previous, current)=>{
	return previous > current ? previous : current;
});
console.log(output); //print greatest number..


//Q.4. we have given array of students marks . filter out marks of students  that score 90+....


let marks = [67,88,93,91,66,94,66,79];

let toppers = marks.filter((Val)=>{
	return val > 90;
]);
console.log(toppers);


//Q.5. take a number 'n' as ainput from auser. and create an array of numvers from 1 to 'n'..


let n = prompt("Enter a number :");//input by user...

let arr = [];

for(let i=1; i<=n; i++){
	arr[i-1] = i; 
}

console.log(arr);//print arrys..

let sum = arr.reduce((res, curr)=>{
	return res+curr;
});
console.log("sum",sum);//print sum of all arrays numbers...


let fact = arr.reduce((res, curr)=>{
	return res*curr;
});
console.log("facorial", fact);//print factorial of all numbers of arrays...
















