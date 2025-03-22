// Q.1 wriete a js program to print the following afetr 2 second delay. 
// hello...
// world...

const a = (text) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(text);
        }, 2000)
    });
}

(async () => {
    let text = await a("hello");
    console.log(text);
    text = await a("world");
    console.log(text);
})();

// Q.2 write a js program to find average of numbers in an array using spread operator.

function sum (a, b, c) {
    return a + b + c;
}
let x = [4, 8, 9];
let s = sum(...x);
console.log(s);