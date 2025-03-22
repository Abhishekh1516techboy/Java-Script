function multiplyBy5 (num) {
    return num * 5;
};

multiplyBy5.power = 2;

console.log(multiplyBy5(5));
console.log(multiplyBy5.power);
console.log(multiplyBy5.prototype);

// ---------------------------------------
function createUser (userName, score) {
    this.userName = userName;
    this.score = score;
};

createUser.prototype.increment = function () {
    this.score++;
};

createUser.prototype.printMe = function () {
    console.log(`${this.score}`)
};

// new KeyWord...
const chai = new createUser("chai", 25);
const tea = new createUser("tea", 150);

console.log(chai);
console.log(tea);

tea.increment();
tea.printMe();
console.log(tea);

chai.increment();
chai.printMe();
console.log(chai);

// ----------ProtoType----------
// let myName = "Abhishekh   ";
// let myChannel = "chai    ";
// console.log(myName.trueLength);

let myHeros = ["thor", "krish"];

let heroPower = {
    thor: "hammer",
    krish: "flying",

    getKrishPower: function () {
        console.log(`Krish power is ${this.thor.krish}`)
    }
};

Object.prototype.hitesh = function () {
    console.log(`Hitesh is present in all objects`);
};

Array.prototype.heyHitesh = function () {
    console.log(`Hitesh say hello`)
};

heroPower.hitesh();
myHeros.hitesh();

// heroPower.heyHitesh(); // not acces in object...
myHeros.heyHitesh();

// ---------Inheritance---------

const user = {
    name: "chai",
    email: "chai@samsung.com"
};

const teacher = {
    makeVideo: true
};

const teachingSupport = {
    isAvaliable: false
};

const taSupport = {
    makeAssignment: "Js assignment",
    fullTime: true,
    __proto__: teachingSupport
};
// old inheritance syntax...
teacher.__proto__ = user;

// modern inheritance syntax...
Object.setPrototypeOf(teachingSupport, teacher);

// --------------------------------------
let anotherUserName = "chaiAurCode      ";

String.prototype.trueLength = function () {
    console.log(`${this}`);
    console.log(`True length is: ${this.trim().length}`);
};

anotherUserName.trueLength();
"abhishekhkumar".trueLength();
taSupport.makeAssignment.trueLength();