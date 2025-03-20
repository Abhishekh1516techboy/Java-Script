class RailwayForm {

    constructor(name, to, from, pay) {
        this.name = name;
        this.to = to;
        this.from = from;
        this.pay = pay;
    }

    submit () {
        console.log(`your form is submitt mr.${this.name}`);
    }

    checkStatus () {
        console.log(`${this.to} to ${this.from} ticket is confirmd mr.${this.name}`)
    }

    cnacel () {
        console.log(this.name + " your ticket is cancelled successfully.")
    }

    fill () {
        console.log("Form filled by " + this.name);
    }

    payment () {
        console.log(`${this.pay} Pay by ${this.name} for ${this.to} to ${this.from} Journey`);
    }
}

let harry = new RailwayForm("harry", "Patna", "Delhi", "1150");
harry.fill();
harry.submit();
harry.payment();
harry.checkStatus();

console.log("-----------------------------------------");

let roushan = new RailwayForm("Roushan", "Patna", "gujrat", "1800");
roushan.fill();
roushan.submit();
roushan.payment();
roushan.cnacel();