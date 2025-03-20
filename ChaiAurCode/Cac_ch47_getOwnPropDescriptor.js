const value = Object.getOwnPropertyDescriptor(Math, "PI");
// console.log(value)

// console.log(Math.PI);
// Math.PI = 4; // can't change PI value directly...
// console.log(Math.PI); 

// chai Object...
const chai = {
    name: "Milk Tea",
    price: 20,
    isAvailable: true,

    orderChai: function () {
        console.log("Chai nahi bai hai.")
    }
}
console.log(chai);

console.log(Object.getOwnPropertyDescriptor(chai, "name"));

Object.defineProperty(chai, "name", {
    // writable: false,
    enumerable: true
});

console.log(Object.getOwnPropertyDescriptor(chai, "name"));

for (let [key, value] of Object.entries(chai)) {
    if (typeof value !== 'function') {
        console.log(`${key} : ${value}`)
    }

}
