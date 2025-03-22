"use strict";

function hello1 () {
    let message = "good morning";
    {
        let message = "good afetrnoon";
        console.log("i am Hello1 " + message);
    }
    console.log(message);

    let c = function hello2 () {
        console.log("i am hello2 " + message);
    }
    return c;
}
let c = hello1();
c();

// -------------------------------------------
function returnFunc () {
    const x = () => {
        let a = 1;
        console.log(a);

        const y = () => {
            let a = 2;
            console.log(a);

            const z = () => {
                let a = 3;
                console.log(a);
            }
            z();
        }
        y();
    }
    return x;
}

// let fun = returnFunc();
// fun();
returnFunc()(); // execute one line...