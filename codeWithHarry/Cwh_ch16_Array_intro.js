let marks_BCA = [77, 99, 76, 78, 66];
console.log(marks_BCA);
console.log(marks_BCA[0]);
console.log(marks_BCA[1]);
console.log(marks_BCA[2]);
console.log(marks_BCA[3]);
console.log(marks_BCA[4]);

marks_BCA[1] = 88; //  change valuse...
console.log("Length: ",marks_BCA.length);
console.log(marks_BCA);

marks_BCA.push(49); // add new valuse.
marks_BCA.push(89);// add new valuse.
marks_BCA.push(69);// add new valuse.
console.log(marks_BCA);

marks_BCA.shift(); // remove values starting...
console.log(marks_BCA);
marks_BCA.unshift(48);
marks_BCA.unshift(73);
console.log(marks_BCA);