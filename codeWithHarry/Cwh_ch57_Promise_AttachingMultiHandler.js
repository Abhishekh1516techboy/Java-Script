let p1 = new Promise((resolve, reject) => {
    console.info("Wait 2 second for resolving.")
    setTimeout(() => {
        resolve(1);
        console.log("Hey i am resolved");
    }, 2000);

});

p1.then((value) => {
    console.info("Congratus this promise is resolved.", value);
});


p1.then((value) => {
    console.log("Hurray");
});