// Q.1 Create a variable of type String and try to add a number to it.
let a = "ABhi";
let b = 9;
console.log(a + b);

// Q.2 Use typeOf operator and find the dataType of the string in last question.
console.log(typeof (a + b));

// Create a const Object in js can you change it to hold a number later?
const number = {
    Name: "harry",
    section: "A",
    roll: 5,
}
// roll = 8; //cnat change a value 
console.log(number);

// Q.4 Try to add a new key to the const Object in problem 3. where you able to do it?
number["address"] = "Patna";
number["class"] = "BCA";
console.log(number);

// Q.5 create a js program to create a word meaning dictionary of 5 word.
const dictionary = {
    appreciate: "reconize the full worth of.",
    ataraxia: "a state of freedom from emotional distrubance and anxiety",
    yakka:"work, especially hard work"
};

console.log(dictionary)
console.log(dictionary.yakka)