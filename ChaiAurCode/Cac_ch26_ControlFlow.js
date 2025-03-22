const isUserLoggedIn = true;

if (isUserLoggedIn) {
    console.log("user LoggedIn")
}

const userEmail = "hitesh@gmail.com";
if (userEmail) {
    console.log("GO to user Email");
}else{
    console.log("Dont have user Email");
}

const emptyObj = {};
if (Object.keys(emptyObj).length === 0) {
    console.log("Object isEmpty");
}

const emptyArr = [];
if (Object.keys(emptyArr).length === 0) {
    console.log("Array isEmpty");
}