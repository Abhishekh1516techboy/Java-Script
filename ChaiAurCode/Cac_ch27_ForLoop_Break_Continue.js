// ForLoops...
for (let i = 0; i <= 10; i++) {
    const element = i;
    if (element == 5) {
        console.log("5 is my favroute number.");
    }
    console.log(element);
}


// break and continue...
for (let i = 1; i <= 20; i++) {
    if (i == 5) {
        console.log(`Detected ${i}`)
        break;
    }
    console.log(`Value of i is ${i}`)
}

for (let i = 1; i <= 10; i++) {
    if (i == 5) {
        console.log(`Detected ${i}`)
        continue;
    }
    console.log(`Value of i is ${i}`)
}