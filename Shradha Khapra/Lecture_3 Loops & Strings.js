// ----------------------Loop's-----------------------

// =============For loop============

// print 1 to 10 times...

for(let count=1; count <=5; count++){
	console.log("Apna college by Saradha Khapra");
}

//Calculate sum of 1 to 100...

// let sum=0;
// let num=100;

// for(let i=1; i<=num; i++){
// 	sum=sum+i;
// }

// console.log("Sum=", sum);

// =============while loop============

// let i=1;
// while(i<=5){
// console.log("Apna college");
// i++
// }

// =============(3.)Do while loop============

// let i=1;
// do{
//  console.log("apna college");
//  i++;
// } while(i<=10);

// =============For-of loop============

//  let str="ApnaCollege";

//  let size=0;

//  for(let val of str){
//   console.log("i=",val);
//  size++;
// }
// console.log("string size=", size);


// =============For in loop============

//  let student={
//  name: "Rahul kumar",
//  age:21,
//  cgpa:7.5,
//  isPass:true,
// };

//  for(let key in student){
//  console.log("key=", key, "value", student[key]);
// }

// //Q1.1. print all Even numbers 1 to 100.....

// for(let num=1; num<=100; num++){
//  if(num%2==0){//for Even numbers...
//   console.log("Even num=", num);
//  }
// }

//Q1.2. print all Odd numbers 1 to 100....

// for(let num=0; num<=100; num++){
//  if(num%2!==0){//for odd numbers...
//   console.log("Even num=", num);
//  }
// }

// Q2. Guess right number simple game.....
// let gameNum=25;
// let userNum = prompt("Guess the right number..");

//  while(userNum!=gameNum){
//  userNum = prompt("You entered wrong number .. guess again..");
// }
// console.log("Congratulations number matched...");




// ***************************String's******************************



// =============strings============


// let str="ApnaCollege";
// let str2="Abhishekh";
// console.log(str[2]);//Output:n

// =============Templet Literals============


// let specialString=`This is templet Literals`;
// let specialString1=`This is templet Literals ${5+5}`;
// console.log(specialString);
// console.log(typeof specialString);

// Ex:-(1)...
// let obj = {
//     item: "pen",
//     price: 10,
// };
// console.log("The  cost of", obj.item, "is ", obj.price, "rupee");

// Ex:-(2)...
// let obj = {
//     item: "pen",
//     price: 10,
// };
// let output= `The cost of ${obj.item} is ${obj.price} rupees `
// console.log(output);


// =============Str.length============

// let str="ApnaCollege";
// console.log(str.length);//Output:11

// let str="Apna\nCollege";
// console.log(str.length);//Output:12

// ......String Methods...
//str.toUppercase()..

// let str="ApnaCollege";
// console.log(str.toUpperCase());

// =============str.toLOwercase()=============

// let str="ABHISHEKH";
// console.log(str.toLowerCase());

// str.trim...

// let str="     Apna College   ";
// console.log(str.trim());

// =============str.slice(start,end?)=============

// let str="ApnaCollege";
// console.log(str.slice(3,10));//Output:aColleg

// =============str1.concat(str2)=============

// let str1="Abhi";
// let str2="shekh";
// let output=str1.concat(str2);
// console.log(output);

// =============str.replace(searchVal , new Val)=============

// let str="papu";
// console.log(str.replace("p","L"));


// =============str.replaceAll(searchVal , newVal)=============

// let str="papapupa"
// console.log(str.replaceAll("p","L"));

// str.charAt(index)...

// let str="Abhishekh1516techboy";
// console.log(str);
// console.log(str.charAt(4));//Output:s


// Q1. Generate username  get a input by users and make  user name @+fullName+flulNamelLength.....

// let fullName= prompt("Enter user name plz without space plz..");
// let userName="@" + fullName + fullName.length;
// console.log(userName);