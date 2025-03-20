let promise = new Promise((resolve, reject) => {
    console.info("plz wait Resolved after 2 second.")
    setTimeout(() => {
        resolve(56)
    }, 2000)
});

promise.then((value) => {
    console.info(value);
    // create new promise...
    let promise2 = new Promise((resolve, reject) => {
        console.info("plz wait 3 second for resolved.")
        setTimeout(() => {
            resolve("promise 2")
        }, 3000)

    });
    return promise2;

}).then((value) => {
    console.info(value);
    return 2;
}).then((value) => {
    console.info("Time taken 2 second plz wait....")
    setTimeout(() => {
        console.log(value);
        console.log("Now we are done...")
    }, 2000)
});


// --------------Load script function-----------------
const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = src;
        document.body.appendChild(script);
        script.onload = () => {
            resolve(1);
        };
        script.onerror = () => {
            reject(0);
        };
    });
};

let p1 = loadScript("https://codewithharry.com");

p1.then((value) => {
    console.info("Script Load successfull", value);
}).catch((error) => {
    console.error("LoadScript throw Error...", error);
});