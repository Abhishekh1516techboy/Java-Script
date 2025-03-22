class Employee {
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


class Programmer extends Employee {
    requestCoffee (x) {
        console.log(`Employee has requested ${x} coffee.`)
    }

    // Method Overriding
    requestLeaves (leaves) {
        console.log(`Employee has requested for ${leaves + 1} leaves (One Extra).`);
    }
}



class Developer extends Employee {
    requestCoffee (x) {
        console.log(`Employee has requested ${x} coffee.`)
    }

    // Super Keyword...
    requestLeaves (leaves) {
        super.requestLeaves(leaves); // call automatic
    }
}


let emp = new Employee();
emp.login();
emp.requestLeaves("8 days");

console.log("--------------------------------")

let prog = new Programmer();
prog.login();
prog.requestLeaves(2);
prog.requestCoffee(2);

console.log("--------------------------------")

let dev = new Developer();
dev.login();
dev.requestLeaves(4);
dev.requestCoffee(3);
