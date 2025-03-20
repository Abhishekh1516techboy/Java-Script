// Array Method ch17...
let num = [1, 2, 39, 64, 57, 11];
let newNum = num.toString();
console.log(typeof newNum);
let c = num.join("_");
console.log(c);
console.log(typeof c);

//  advance Array Method ch18...
console.log("\n");
let n = [1, 4, 72, 8, 64, 4, 33];
console.log(n);
delete n[1]
console.log(n);

let m = [34, 8, 7, 48, 74, 14, 3];
let neN = n.concat(m);
let m1 = [88, 48, 37, 48, 72, 34, 3];
let neNew = neN.concat(m1);
console.log(neNew);

// short...
let compare = (a, b) => {
    return a - b;
}
let number = [34, 8, 7, 48, 74, 14, 3];
let sortNnum = number.sort(compare);
console.log(sortNnum);

// slice and splice...
let splElm = [4, 8, 7, 48, 74, 14, 3]; 
console.log("Arr: ",splElm);
let deletedVal = splElm.splice(2, 3, 1022,1033,1044,1055,1066,1077);
console.log("Deleted succesful: ",deletedVal);
console.log(splElm); // modified originak array...

// slice....
let sliceElm = [4, 8, 7, 48, 74, 14, 3]; 
console.log(sliceElm.slice(2, 4))
console.log(sliceElm); // slice canst change original arr...