//===========DOM==============
// alert(" are you humam");
// console.log("hey i am programmer");
// document.body.style.background = "green"
// document.body.style.background= "red"
// document.body.childNodes[1].innerText = "Document object module";
// document.body.childNodes[3].backgroundColor = "Document object module";
// document.body.childNodes[5].innerText = "apna college";
// document.body.childNodes[7].innerText = "apna college";
// document.body.childNodes[9].innerText = "Press me!";


/*   DOM manipulation  */

// selecting by id...

// let heading = document.getElementById("heading");
// console.dir(heading);

// selecting by class...

// let headings = document.getElementsByClassName("heading");
// console.dir(headings);


// selecting by tag..

// let parahs = document.getElementsByTagName("p");
// console.dir(parahs);


// Selecting by QuerySelector...

// let firstEl = document.querySelector("p");
// console.dir(firstEl);

// let allEl = document.querySelectorAll("p");
// console.dir(allEl);



// let firstEl = document.querySelector(".heading");
// console.dir(firstEl);

// let allEl = document.querySelectorAll(".heading");
// console.dir(allEl);


// let firstEl = document.querySelector("#btn");
// console.dir(firstEl);
// console.dir(firstEl.tagName);

// let allEl = document.querySelectorAll("#btn");
// console.dir(allEl);


// Q1. create a h2 heading element with text-"Hello javaScript". Append "from Apna College Students" to this text usig jc...

// let h2 = document.querySelector("h2");
// console.dir(h2);
// console.dir(h2.innerText);
// h2.innerText = h2.innerText + " from apna College Student";

// Q2. create 3 div with common class name- "box". Access them & add some unique text to each of them....

// let mydivs = document.querySelectorAll(".box");
// console.dir(mydivs); 

// using loops..

let mydivs = document.querySelectorAll(".box");
console.dir(mydivs); 
let idx = 1;
for(div of mydivs){
div.innerText =`new unique values ${idx} `;
idx++;
}

//simple without loops... 

// mydivs[0].innerText ="new value 1";
// mydivs[1].innerText ="new value 2";
// mydivs[2].innerText ="new value 3";