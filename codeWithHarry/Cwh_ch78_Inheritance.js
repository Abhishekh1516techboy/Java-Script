class Animal {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    run () {
        console.log(`${this.name} is Running.`);
    }

    shout () {
        console.log(`${this.name} is shouting!`);
    }
}

class Monkey extends Animal {
   eatBanana(){
    console.log(`${this.name} is eating banana.`)
   }
}

let ani = new  Animal("Chimpu", "orange");
ani.run()
ani.shout()


let monk = new  Monkey("Broue", "Brown");
monk.run()
monk.shout()
monk.eatBanana()