// function...
function addNum (num1, num2) {
    console.log(`Add of ${num1} and ${num2} is ${num1 + num2}`);
}

addNum(4, 8);

function multiplyNum (num1, num2) {
    let result = num1 * num2;
    return result;
}
console.log(multiplyNum(4, 8));

function loginUsermessage (userName) {
    if (userName === undefined) {
        console.log(`please enter a userName`)
        return;
    }
    return `${userName} just logdedIn`;
}
const logUsrMsg = loginUsermessage("Abhishekh1516techboy");
console.log(logUsrMsg);