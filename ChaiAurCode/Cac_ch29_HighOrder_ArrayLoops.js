// For-of Loops...
const arr = [1, 2, 3, 4, 5];
for (const num of arr) {
    console.log(`The value of ${num - 1} idx is ${num} `)
}

const greeting = "Hello Programmer!";
for (const greet of greeting) {
    if (greet == " ") {
        continue;
    }
    console.log(`Each char is ${greet}`)
}

// Maps...

const map = new Map();
map.set("IN", "India");
map.set("USA", "United state of america");
map.set("FR", "France");

console.log(map);
for (const [key, value] of map) {
    console.log(key, "->", value)
}

// const myObj = { // Not work for of loops in Objects...
//     game1: "NfS",
//     game2: "PS5",
//     game3: "FreeFire",
// };

// for (const [key, value] of myObj) {
//     console.log(key, " ", value);
// }
console.log("\n")

// For-in Loops...
const myObject = {
    js: "javaScript",
    cpp: "C++",
    rb: "ruby",
    py: "python",
};

for (const key in myObject) {
    console.log(`${key} FullForm is ${myObject[key]}`);
}

const program = ["js", "rb", "py", "java", "cpp"];
for (const key in program) {
    console.log(program[key])
}

// ForEach Loops...
const coding = ["js", "cpp", "java", "python", "ruby",];
coding.unshift("css");

coding.forEach((elm) => {
    console.log(elm);
});

function printMe (elm) {
    console.log(elm)
}

coding.forEach(printMe);

coding.forEach((item, idx, arr) => {
    console.log(item, idx, arr);
});

const myProgram = [
    {
        langName: "JavaScript",
        langFileName: "js",
    }, 
    {
        langName: "Python",
        langFileName: "py",
    }, 
    {
        langName: "ruby",
        langFileName: "rb",
    },
];

myProgram.forEach((item) => {
    console.log(item.langName,"->", item.langFileName)
});