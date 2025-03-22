// let btn1 = document.querySelector("#btn1");
// btn1.onclick = ()=>{
//     console.log("btn1 was clicked!!");
// };

// let div= document.querySelector("#div1");
// div.onmouseover = (e)=>{
//     console.log("you are inside div");
//     console.log(e.type);
//     console.log(e.target);
//     console.log(`clientx=${e.clientX}\nclientY=${e.clientY}`);
// };

// Event Listener...

// let btn1 = document.querySelector("#btn1");

// btn1.addEventListener("click", ()=>{
//     console.log("btn1 was clicked-handler 1");
// });


// btn1.addEventListener("click", ()=>{
//     console.log("btn1 was clicked handler 2");
// });


// const handler3 = ()=>{
//     console.log("btn1 was clicked handler 3");
// };
// btn1.addEventListener("click", handler3);


// btn1.addEventListener("click", ()=>{
//     console.log("btn1 was clicked handler 4");
// });

// remov Listener by call back function--

// btn1.removeEventListener("click", handler3);

// Q.1. create a toggle btn that changes the screen to dark-mode when clicked & Light-mode when clicked again--

//create element 

let toggleBtn = document.createElement("button");

// add styling ...
toggleBtn.innerText = "Light-Mode!";
toggleBtn.style.color = "blue";
toggleBtn.style.fontSize = "25px";
toggleBtn.style.marginBottom = "10px";
toggleBtn.style.marginRight = "10px";
toggleBtn.style.borderRadius = "25px";
toggleBtn.style.cursor="pointer";


// Insert element

let body = document.querySelector("body");
body.prepend(toggleBtn);


// addEventListener on btn for dark mode & light mode

// let currMode = "Light-Mode";

// toggleBtn.addEventListener("click", () => {
//     if (currMode === "Light-Mode") {
//         currMode = "Dark-Mode";
//         toggleBtn.style.backgroundColor="red"
//         toggleBtn.innerText="Dark-Mode"
//         console.log("Dark-Mode");
//         document.querySelector("body").style.backgroundColor = "black"
//     } else {
//         currMode = "Light-Mode";
//         toggleBtn.style.backgroundColor="yellow"
//         toggleBtn.innerText="Light-Mode"
//         console.log("Light-Mode");
//         document.querySelector("body").style.backgroundColor = "white"
//     }
// });


// using classList method...

let currMode = "Light-Mode";

toggleBtn.addEventListener("click", () => {
    if (currMode === "Light-Mode") {
        currMode = "Dark-Mode";
        toggleBtn.style.backgroundColor="red"
        toggleBtn.innerText="Dark-Mode"
        console.log("Dark-Mode");
        body.classList.add("Dark-Mode");
        body.classList.remove("Light-Mode");
    } else {
        currMode = "Light-Mode";
        toggleBtn.style.backgroundColor="yellow"
        toggleBtn.innerText="Light-Mode"
        console.log("Light-Mode");
        body.classList.add("Light-Mode")
        body.classList.remove("Dark-Mode");
    }
});



