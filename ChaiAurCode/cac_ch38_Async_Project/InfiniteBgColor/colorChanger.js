// --------------------------------------Writing code 1/8/2024 Thursday------------------------------------
// RGB backgroundColor changer...
// generate a Random RGBColor...

// const rgbColor = () => {
//     const randomColor1 = Math.floor(Math.random() * 255 + 1);
//     const randomColor2 = Math.floor(Math.random() * 255 + 1);
//     const randomColor3 = Math.floor(Math.random() * 255 + 1);
//     return `rgb(${randomColor1},${randomColor2},${randomColor3})`;
// };

// // // set RGBColor in BackgroundColor...
// let count = 0;
// let setId;
// document.querySelector("#start-btn").addEventListener('click', () => {
//     setId = setInterval(() => {
//         document.body.style.backgroundColor = rgbColor();
//         document.querySelector("h2").textContent = `count start: ${++count}`; // count  how many times color change..
//     }, 1500)
//     console.log("start");
// });

// document.querySelector("#stop-btn").addEventListener('click', () => {
//     clearInterval(setId);
//     document.querySelector("h2").textContent = `count stop: ${count}`; // count  how many times color change..
//     console.log("Stop")
// });

// --------------------------------------Writing code 2/8/2024 friday------------------------------------
// HexCode backgroundColor changer...
// generate a Random HexColor...

const HexaColor = () => {
    const hexNum = '0123456789ABCDEF';
    let Color = "#";
    for (let i = 0; i < 6; i++) {
        const randColor = Math.floor(Math.random() * 16);
        Color += hexNum[randColor];
    }
    return Color;
};

// set HexColor in BackgroundColor...
let counter = 0; //counter...
let setIntervalId = null;

const startChangingColor = () => {
    if (!setIntervalId) { // check intervalId is null (value is null code running)*...
        setIntervalId = setInterval(() => {
            document.body.style.backgroundColor = HexaColor();
            document.querySelector("h2").textContent = `counter start: ${++counter}`; // counter  how many times color change..
        }, 1500);
    }
    console.log("start");
};

const stopChangingColor = () => {

    if (setIntervalId !== null) {
        clearInterval(setIntervalId);
        setIntervalId = null; // clear interval id values in memory location...
        document.querySelector("h2").textContent = `counter stop: ${counter}`; // counter  how many times color change..
        console.log("Stop");
    }
};

document.querySelector("#start-btn").addEventListener('click', startChangingColor);

document.querySelector("#stop-btn").addEventListener('click', stopChangingColor);


// --------------------------------------Depericated code 2/8/2024 friday------------------------------------
// let count = 0; //counter...
// let setId;
// document.querySelector("#start-btn").addEventListener('click', () => {
//     setId = setInterval(() => {
//         document.body.style.backgroundColor = HexaColor();
//         document.querySelector("h2").textContent = `count start: ${++count}`; // count  how many times color change..
//     }, 1500)
//     console.log("start");
// });

// document.querySelector("#stop-btn").addEventListener('click', () => {
//     clearInterval(setId);
//     document.querySelector("h2").textContent = `count stop: ${count}`; // count  how many times color change..
//     console.log("Stop")
// });