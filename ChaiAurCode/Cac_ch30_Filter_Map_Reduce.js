// ---------Filter method-------
const programming = ["js", "cpp", "java", "python", "ruby"];

programming.forEach((element) => {
    console.log(element);
});

const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const myNum = num.filter((n) => {
    return n < 6;
});
console.log(myNum);

const num1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const newNum = [];
num1.forEach((elm) => {
    if (elm < 5) {
        newNum.push(elm);
    }
});
console.log(newNum);

// filter books data using filter...
const books = [
    { title: "Book one", genre: "fiction", publish: 1981, price: 800 },
    { title: "Book two", genre: "Non-fiction", publish: 1992, price: 400 },
    { title: "Book three", genre: "History", publish: 1896, price: 430 },
    { title: "Book four", genre: "Programming", publish: 1956, price: 850 },
    { title: "Book five", genre: "science", publish: 1869, price: 650 },
    { title: "Book six", genre: "programming", publish: 1988, price: 750 },
    { title: "Book seven", genre: "fiction", publish: 1899, price: 450 },
    { title: "Book eight", genre: "History", publish: 2008, price: 620 },
    { title: "Book nine", genre: "science", publish: 2009, price: 460 },
    { title: "Book ten", genre: "History", publish: 1988, price: 960 },
];

let userBooks = books.filter((bk) => {
    return bk.price < 700 && bk.genre === "History";
});
console.log("Price less then 700 and History Book: ", userBooks);

userBooks = books.filter((bk) => {
    return bk.publish >= 2000;
});
console.log("Publish after 2000: ", userBooks);

// ---------Map method--------
const myNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const number = myNumber.map((n) => {
    return n + 10;
});
console.log(number);

const newNums = myNumber
    .map((n) => n * 10)
    .map((n) => n + 1)
    .filter((n) => n >= 40);
console.log(newNums);

// --------Reduce method--------
const myNum1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const myTotalNum = myNum1.reduce((acc, currVal) => {
    console.log(`acc: ${acc} and currVal: ${currVal}`);
    return acc + currVal;
}, 0);
console.log("Total Sum is: ", myTotalNum);

const totalNum = myNum1.reduce((ac, curr) => ac + curr, 0); // reduce method one Line Code...
console.log("Total Values: ", totalNum);

// shoppingCart...
const shoppingCart = [
    {
        courseName: "js Course",
        price: 2999,
    },
    {
        courseName: "py Course",
        price: 999,
    },
    {
        courseName: "c++ Course",
        price: 599,
    },
    {
        courseName: "java Course",
        price: 3999,
    },
    {
        courseName: "mySql Course",
        price: 1999,
    },
    {
        courseName: "DB Course",
        price: 499,
    },
];

const cartPrice = shoppingCart.reduce((acc, item) => acc + item.price, 0);
console.log("Total Price of shoppingCart: ", cartPrice);