// --------Promise creates many forms-----------
// Create Promise number 1...
const promiseOne = new Promise((resolve, reject) => {
    // Do an async tasks
    // DataBase calls, criptography, network 
    setTimeout(() => {
        console.log("Async task is complite");
        resolve(); // resolve() connected with .then()... 
    }, 1000)

});

promiseOne.then(() => { // resolve tasks performs...
    console.log("Promise consumed");
});


// -------------Create Promise number 2----------------
new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Async task 2");
        resolve();
    }, 1000)

}).then(() => {
    console.log("Async 2 resolved");

});


// -------------Create Promise number 3----------------
const promiseThree = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            userName: "ABhishekh1516techboy",
            email: "Abhishekhkumar1516@gmail.com"
        });
    }, 1000)

});

promiseThree.then((user) => {
    console.log(user);
});


// -------------Create Promise number 4----------------
const promiseFour = new Promise((resolve, reject) => {

    setTimeout(() => {
        let error = false;
        if (!error) {   // Agar error nahi hai
            resolve({
                userName: "Hitesh", password: "@Knowme^123"
            });
        } else {
            reject("ERROR: Something went Wrong");
        }

    }, 1000)
});

promiseFour.then((user) => { // resolve code...
    console.log(user);
    return user.userName; // return values...

}).then((userName) => { // get returned values... 
    console.log(userName);

}).catch((error) => { // rejection code...
    console.log(error);
}).finally(() => { // finally always run...
    console.log("The promise is either resolved or rejected. ")
});


// -------------Create Promise number 5----------------
const promiseFive = new Promise((resolve, reject) => {
    setTimeout(() => {
        let error = true;
        if (!error) {   // Agar error nahi hai
            resolve({
                userName: "javaScript", password: "@javaScript^123"
            });
        } else {
            reject("ERROR: JavaScript went Wrong");
        }
    }, 1000);
});

consumePromiseFive = async () => {
    try {
        const response = await promiseFive; // await is waiting for response...
        console.log(response);
    } catch (error) { // throw errors...
        console.log(error);
    }
};

consumePromiseFive();

// *************** fetch with asyns and await *******************
// const getAllUsers = async () => {
//     try {
//         const response = await fetch("https://jsonplaceholder.typicode.com/users");
//         // const response = await fetch('https://api.github.com/users/hiteshchoudhary');
//         const data = await response.json();
//         // console.log(data[0].name);

//         // data.forEach(el => {
//         //     console.log(el);
//         // });

//     } catch (error) {
//         console.log(error);
//         console.log("getAllUsers throw errors!");
//     }
// };
// getAllUsers();


// ****************API call fetch with then and catch*************** 

function githubData (data) {
    console.log(data)

}

fetch("https://api.github.com/users/hiteshchoudhary")
    .then((res) => {
        return res.json();

    }).then((data) => {
        githubData(data);
        // console.log(data);

    }).catch((error) => {
        console.error("Error throw!", error)
    });

