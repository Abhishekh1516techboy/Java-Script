let promise = fetch("https://api.github.com/users/hiteshchoudhary");

promise.then((response) => {
    console.log(response.status);
    console.log(response.ok);
    return response.json(); // change Object to json...
}).then((value) => {
    console.log(value);
}).catch((error) => {
    console.log("fetch throw error...");
});