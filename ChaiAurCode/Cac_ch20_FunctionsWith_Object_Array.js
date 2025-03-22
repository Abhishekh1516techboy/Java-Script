function calculateCartPrice (...num1) { //...rest Operator
    return num1;
}
console.log(calculateCartPrice(200, 400, 900));

const user = {
    userName: "Abhi",
    price: 199,
}

function handleObj (anyObject) {
    console.log(`useName is ${anyObject.userName} and price is ${anyObject.price}`)
}
handleObj(user);

handleObj(
    {
        userName: "Hitesh",
        price: 399,
    }
);

// Arrays in function... 

const myArray = [200, 800, 600, 400];

function retSecVal (getArray) {
    return getArray;
}
console.log(retSecVal(myArray));
console.log(retSecVal([200, 900, 400, 700]));