	// ====Attribute=======

// let div = document.querySelector("div");
// console.log(div);

// =======getAttribute=======

// let id = div.getAttribute("id");
// console.log(id);

// let name = div.getAttribute("name");
// console.log(name);

// let para = document.querySelector("p");
// console.log(para.getAttribute("class"));


// =====setAttribute(attr)=====

// let para = document.querySelector("p");
// console.log(para.setAttribute("class" , "newpara"));


// ======style========

// let div = document.querySelector("div");
// console.log(div.style);

//Change style of div...

// let div = document.querySelector("div");
// div.style.backgroundColor= "purple";
// div.style.fontSize= "28px";
// div.style.color= "yellow";
// div.innerText= "js by sradha khapra";
// div.style.visibility = "hidden";
// div.style.visibility = "visible";


// ======Insert Elements=======

// inser a new btn ....

// let newBtn = document.createElement("button");
// newBtn.innerText= "click me!";
// console.log(newBtn);
 
//------node.apend(el) method------

// add btn last in div....

// let div = document.querySelector("div");
// div.append(newBtn);

// add btn starting in div....

// let div = document.querySelector("div");
// div.prepend(newBtn);

// add btn before div....

// let div = document.querySelector("div");
// div.before(newBtn);

// add btn after paragrapth....

// let p = document.querySelector("p");
// p.after(newBtn);

//------node.prepend(el) method------

// let newHeading = document.createElement("h1");
// newHeading.innerHTML = "<i>hi, i am new Heading created by js!</i>";
// ------insert heading----------

// document.querySelector("body").prepend(newHeading);

// remove heading...
// newHeading.remove();

// document.querySelector("span").prepend(newHeading);


// create new element by js...

// let newPara = document.createElement("h2");
// newPara.innerHTML = "this is new paragraph by js!";

// document.querySelector("span").before(newPara);


// create new element by js...
// let span = document.createElement("h2");
// span.innerHTML = "this is span tag by js! ";


// document.querySelector("span").append(span);

// ==========DElete method=========
// elements deleted by js ...

//remove p tag.... 

// let para = document.querySelector("p");
// para.remove();

/* Q.1..create a new btn element. give it a text "Click me!",
   background color red & tect color of white.box
*/

//create ntn element.. 

let smlBtn = document.createElement("button");
smlBtn.innerText ="Click me!";

document.querySelector("body").prepend(smlBtn);
smlBtn.style.backgroundColor ="red";
smlBtn.style.color ="white";
smlBtn.style.fontSize ="20px";
smlBtn.style.marginTop = "8px";
smlBtn.style.marginLeft = "20px";
smlBtn.style.border = "2px solid black";
smlBtn.style.cursor = "pointer"


/* Q2. Create a <p> teg in html, give it a class & some  styling. now create  a new class in css and try to append this class to the <p> element. Did you notice, how you overwrite the class name whwn you add a new one ? solve this problem using classList. */

let para = document.querySelector("p");
para.getAttribute("class");
// para.setAttribute("class", "newParaQ2");
para.classList.add("newParaQ2");