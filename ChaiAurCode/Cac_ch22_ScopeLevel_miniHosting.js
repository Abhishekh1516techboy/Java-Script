// Scope Level...
function one () {
    const userName = "Abhishekh";

    function two () {
        const website = "technologyfire.in";
        console.log(userName);
    }
    two();
}

one();

if (true) {
    const userName = "Hitesh";

    if (userName === "Hitesh") {
        const website = " youtube";
        console.log(userName + website)
    }
    // console.log(website); //cant accessable...
}

// ***********Intersting************

function add1 (num) {
    return num + 1;
}

console.log(add1(5));
