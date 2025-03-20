class Animal {
    constructor(name) {
        this.name = Animal.captilize(name);
    }

    walk () {
        console.log("Animal " + this.name + " is walking");
    }

   static captilize (name) {
        return name.charAt(0).toUpperCase() + name.substring(1, name.length);
    }
}

j = new Animal("ashutosh");
j.walk();