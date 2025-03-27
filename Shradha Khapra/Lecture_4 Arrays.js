//============Arrays===========

let marks = [96, 75, 88, 95, 85];
console.log(marks);
console.log(marks.length);
console.log(typesof, marks);

//Strings Array...

// let heros["ironman", "spiderman", "superman", "krish", "padman", "mrAmerica"];
// console.log(heros);
// console.log(typesof, heros);

//............Looping over an Array.............

//Using for loop...

let heros = [
  "ironman",
  "spiderman",
  "superman",
  "krish",
  "padman",
  "mrAmerica",
];

for (let i = 0; i < heros.length; i++) {
  console.log(i);
}

//Using for-of loops.......

let Heros = [
  "ironman",
  "spiderman",
  "superman",
  "krish",
  "padman",
  "mrAmerica",
];

for (let hero of Heros) {
  console.log(hero);
}

let cities = ["delhi", "patna", "hydrabad", "kolkata", "mumbai"];

for (let city of cities) {
  console.log(city);
  console.log(city.toUpperCase());
}

//Q.1.. find avg of marks the entire class students marks [85,55,75,68,95]

// let marks = [85, 55, 75, 68, 95];
let sum = 0;
for (let val of marks) {
  sum = sum + val;
}

let avg = sum / marks.length;
console.log(`Avg of marks of the class = ${avg}`);

//Q.2... offers discount 10% price of product price  [245,655,400,450,60]...

//using for-of loops....

let items = [245, 655, 400, 450, 60];
let i = 0;

for (let val of items) {
  let offer = val / 10;
  items[i] = items[i] - offer;
  console.log(`Value after offer= ${items[i]} `);
  i++;
}

//using for loop...

// let items = [245, 655, 400, 450, 60];

// for (let i = 0; i < items.length; i++) {
// let offer = items[i] / 10;
// items[i] =  - offer;
// }
// console.log(items);

//=========Array methods in js==========

//.push() methods... Add Elements of end idx...

// let foodItems = ["potato", "apple", "mango", "grapes", "watermellon"];
// foodItems.push("chips", "burgger", "eggRoll");
// console.log(foodItems);

//.pop() methods... deleted Elements of end idx...

// let foodItems = ["potato", "apple", "mango", "grapes", "watermellon"];
// console.log(foodItems);
// let deletdeItems = foodItems.pop();
// console.log(foodItems);
// console.log("deleted Products", deletedItems);

//.toString() methods...  Change arry to Strings...

// let foodItems = ["potato", "apple", "mango", "grapes", "watermellon"];
// console.log(foodItems);
// console.log(foodItems.toString());

//.concat()....

// let marvelHeros = ["thor", "spiderman", "ironman", "CaptionAmerica", "hulk"];
// let dcHeros = ["superman", "Batman"];
// let indianHeros = ["shaktiman", "krish", "baalveer"];

// let heros = marvelHeros.concat(dcHeros, indianHeros);
// console.log(heros);

//.unshift().... Add elements on first index....

// let marvelHeros = ["thor", "spiderman", "ironman", "CaptionAmerica", "hulk"];

// marvelHeros.unshift("antman");

//.shift().... Delete elements of first index....

// let marvelHeros = ["thor", "spiderman", "ironman", "CaptionAmerica", "hulk"];

// let val = marvelHeros.shift();
// console.log("Deleted items", val);

//.slice().... return the pice of specific index of Array...

//.slice(startIdx, endIdx)..

// let marvelHeros = ["thor", "spiderman", "ironman", "CaptionAmerica", "hulk"];

// console.log(marvelHeros);

// console.log(marvelHeros.slice(1, 4));

//.splice()... change original Array (add, remove , replace)...

//splice(startIdx, delCount, newElement)

let arr = [1, 2, 3, 4, 5, 6, 7, 8];

arr.splice(2, 0, 14); //Add Elements

arr.splice(3, 1); //Delete Elements

arr.splice(3, 1, 27); //Replace elements

//Q.3 create an Array to store compines , then (a).Remove first comny (b). Remove others  and add new compny in its place (c). Add Technologyfire at the End of Array ....

//(a)...
let compny = ["microsoft", "apple", "samsung", "sony", "watsapp"];
let deleted = compny.shift();

//(b)...
// let compny = ["microsoft", "apple", "samsung", "sony", "watsapp"];
compny.splice(2, 1, "facebook");

//(c)...
// let compny = ["microsoft", "apple", "samsung", "sony", "watsapp"];
compny.push("Technologyfire");
