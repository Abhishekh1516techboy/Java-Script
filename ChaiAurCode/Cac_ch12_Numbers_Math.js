// --------Number--------
const score = 400;
const balance = new Number(1000);
console.log(balance);
console.log(balance.toString());
console.log(balance.toString().length);
console.log(balance.toFixed(2));

const otherNum = 123.8688;
console.log(otherNum);
console.log(otherNum.toPrecision(4));

const num = 1000000;
console.log(num.toLocaleString('en-IN'))

// --------Math--------
console.log(Math);
console.log(Math.abs(-5));
console.log(Math.round(5.3));
console.log(Math.ceil(5.2));
console.log(Math.floor(5.9));
console.log("Min Value: ", Math.min(4, 8, 6, 7, 2));
console.log("Max Value: ", Math.max(4, 8, 6, 7, 2));
console.log("Random Value: ", (Math.random() * 10) + 1);
console.log("Random Value: ", Math.floor(Math.random() * 10) + 1);

const min = 10;
const max = 20;
console.log("MIn val 10 and Max Val 20: ",Math.floor(Math.random() * (max - min + 1)) + min);