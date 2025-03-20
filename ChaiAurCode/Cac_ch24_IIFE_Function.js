// Immediately Invoked Function (IIFE)...

// named IIFE...
(function chai () {
    console.log(`DB CONNECTED`);
})();

// simple IIFE...
((name) => {
    console.log(`${name} DB CONNECTED`);
})("Oracle");