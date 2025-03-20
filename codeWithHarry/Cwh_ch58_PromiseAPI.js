// promise number 1...
let p1 = new Promise((resolve, reject) => {
    console.log("Plz wait for resolving...")
    setTimeout(() => {
        resolve(" value 1");
    }, 2000);

});

// promise number 2...
let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve("value 2");
        reject(new Error("Error throw Promise2"));
    }, 3000);

});

// promise number 3...
let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(" value 3");
    }, 4000);

});

// ---------------Promise.all()-----------------------
// let promiseAll = Promise.all([p1, p2, p3]); // resolved all promise same time, but any promise throw error Not run...

// promiseAll.then((value) => {
//     console.log(value);
// });


// ---------------Promise.allSettled()-----------------------
let promiseAllSettled = Promise.allSettled([p1, p2, p3]); // resolved all promise same time any condition resolved or rejected..

promiseAllSettled.then((value) => {
    console.log(value);
});


// // ---------------Promise.race()-----------------------
// let promiseRace = Promise.race([p1, p2, p3]); // run only first resolved Promise any  Promise throw error or not..

// promiseRace.then((value) => {
//     console.log(value);
// });


// // ---------------Promise.any()-----------------------
// let promiseAny = Promise.any([p1, p2, p3]); //run only resolved promise rejected promise avoid...

// promiseAny.then((value) => {
//     console.log(value);
// });