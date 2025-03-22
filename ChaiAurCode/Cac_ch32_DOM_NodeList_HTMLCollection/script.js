const titleId = document.getElementById("title");
console.log(titleId);
titleId.style.backgroundColor = "red";
titleId.style.padding = "15px";
titleId.style.color = "yellow";
titleId.style.fontSize = "30px";
titleId.style.borderRadius = "25px";
titleId.style.border = "2.5px solid yellow";

console.log(titleId.innerHTML);
console.log(titleId.innerText);
console.log(titleId.textContent);

const titleClass = document.getElementsByClassName("heading");
console.log(titleClass);

// ----------querySelector------------
console.log('-------querySelector--------');
console.log(document.querySelector("h2"));

console.log(document.querySelector("#title"));
console.log(document.querySelector(".heading"));

console.log((document.querySelector("p").style.backgroundColor = "green"));

console.log(document.querySelector('input[type = "password"]'));

const ul = document.querySelector("ul");
ul.querySelector("li").style.color = "yellow";
ul.querySelector("li").innerText = "ten";

// ----------querySelectorAll------------
console.log('-------querySelectorAll--------');
const li = document.querySelectorAll("li");
console.log(li);
// li[0].style.backgroundColor = 'yellow';

console.log("--------Using forEach()---------")
li.forEach((e) => {
    e.style.backgroundColor = "blue";
    console.log(e);
});


const className = document.getElementsByClassName("list-item");
console.log('HTMLcollection', className);
const arrFrom = Array.from(className); // change HTMLCollection to Array....
console.log('---------Change HTMLcollection to Array--------');
console.log(arrFrom);

// ---------Using Map() function---------
console.log("--------Using MAP()---------")
console.log(arrFrom.map((d) => {
    console.log(d);
    d.style.backgroundColor = 'purple';
}));

// ---------Using forEach() function---------
console.log("--------Using forEach()---------")
arrFrom.forEach((e) => {
    console.log(e);
    e.style.borderRadius = '15px';
    e.style.border = '2px solid yellow';
    e.style.margin = '10px';
    e.style.padding = '15px';

});
