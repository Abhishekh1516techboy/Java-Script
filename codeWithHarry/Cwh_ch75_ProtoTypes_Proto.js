let a = {
    name: "Harry",
    language: "JavaScript",
}

console.log(a);

let p = {
    run: () => {
        console.log("run");
    },

}

p.__proto__ = { /// set age in p using Prototypes...
    age: 23,
}

a.__proto__ = p; // set run method in using proto...

a.run();
console.log(a.age);