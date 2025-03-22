const marvelHero = ["thor", "ironman", "spiderman", "MrAmerica"];
const dcHero = ["superman", "flash", "batman", "hulk"];

console.log("MarvelHero: ", marvelHero);
console.log("DcHero: ", dcHero);

const allHero = marvelHero.concat(dcHero);
console.log('concat: ', allHero);

const allNewHeros = [...marvelHero, ...dcHero];
console.log("Spread Operator: ", allNewHeros);

const anotherArr = [1, 2, 3, [4, 5, 6, [8, 9]]];
const newAnotherArr = anotherArr.flat(Infinity);
console.log("flat Method: ", newAnotherArr);

console.log(Array.isArray("Abhishekh"));
console.log(Array.from("Abhishekh"));
console.log(Array.from({ myName: "Abhishekh" })); // convert in empty Array..

let score1 = 100;
let score2 = 200;
let score3 = 300;

console.log(Array.of(score1,score2,score3));