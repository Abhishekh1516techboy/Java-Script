console.log("Hello");

let promise = new Promise(function (resolve, reject) {
    console.log(" i am promise Hello")
    resolve(58);
});

setTimeout(() => {
    console.log("i am setTimeOut Hello 1");
}, 1000);

console.log(promise);