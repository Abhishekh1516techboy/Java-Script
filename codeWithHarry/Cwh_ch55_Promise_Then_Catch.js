let promise1 = new Promise(function (resolve, reject) {
    console.log("promise1 is paending...");
    setTimeout(() => {
        resolve(true);
    }, 3000);

});

promise1.then((val) => {
    console.log(val);
});


let promise2 = new Promise(function (resolve, reject) {
    console.log("promise2 is paending...");
    setTimeout(() => {
        reject(new Error("I am a error promise2 rejected..."));
    }, 3000);

});

promise2.catch((error) => {
    console.log("Some error throw promise2.");
});