let a = "23";
a = Number.parseInt(a);// converting string value in Number...
console.log(typeof a);
if (a <0) {
    console.log("This is the valid age.")
}else if(a>18){
    console.log("hey you are adult now.")
}
else{
    console.log("Not valid age");
}