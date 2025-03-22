// --------Dates-------
let myDate = new Date();
console.log("toString: ",myDate.toString());
console.log("toLocalString: ",myDate.toLocaleString());
console.log("toDateString: ",myDate.toDateString());
console.log("toLocalDateString: ",myDate.toLocaleDateString());
console.log("toLocalTimeString: ",myDate.toLocaleTimeString());
console.log("toTimeString: ",myDate.toTimeString());
console.log("toUTCString: ",myDate.toUTCString());
console.log("toJSON: ",myDate.toJSON());

let MyCreatedDate = new Date(2024,6,27);
console.log(MyCreatedDate.toDateString());
console.log(MyCreatedDate.toLocaleDateString());

let myTimeStamp = Date.now();
console.log("------myTimeStamp-------")
console.log(Math.floor(myTimeStamp/1000));

let newDate = new Date();
console.log("-------NewDate-------")
console.log(newDate);
console.log(newDate.getTime());
console.log(newDate.getFullYear());
console.log(newDate.getMonth()+1);
