class Employee {
    constructor(name) {
        console.log(`${name} in Employee class.`)
        this.name = name;
    }

    login () {
        console.log(`Employee has logged in`);
    }

    logout () {
        console.log(`Employee has logged out`);
    }

    requestLeaves (leaves) {
        console.log(`Employee has requested for ${leaves} leaves.`);
    }
}


class Developer extends Employee {

    // constructor Overriding...
    constructor(name) {
        super(name); // super keyword must be written...
        console.log(`${name} in Programmer class.`)
        this.name = name;
    }

    requestCoffee (x) {
        console.log(`Employee has requested ${x} coffee.`)
    }
}


let dev = new Developer("Ankit");
dev.login();
dev.requestLeaves(4);
dev.requestCoffee(3);
