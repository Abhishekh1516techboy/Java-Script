class Bird {
    constructor(name) {
        this.name = name;
    }

    fly () {
        console.log("mai urr rha huu.")
    }

    // getter and setter...
    get name () {
        return `My name is ${this._name}`;
    }

    set name (newName) {
        this._name = newName;
    }
}

let pegion = new Bird("jack");
pegion.fly();
console.log(pegion.name);

// instenceof check obj is belogs to Class or not...
console.log(pegion instanceof Bird);