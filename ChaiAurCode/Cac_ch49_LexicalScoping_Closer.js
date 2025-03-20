// --------------Lexical Scoping--------------
function outer () {
    let userName = "hitesh";

    function inner () {
        let secret = "my123";
        console.log("Inner function:", userName);
    }

    function innerTwo () {
        console.log("InnerTwo function: ", userName)
        // console.log(secret); // can't access secret...
    }
    inner();
    innerTwo();
}

outer();


// --------------Closer--------------
function clickHandler (color) {

    // document.body.style.backgroundColor = `${color}`;

    return function () {
        document.body.style.backgroundColor = `${color}`;
    }
}

document.querySelector("orangeBtn").onclick = clickHandler("orange");
document.querySelector("yellowBtn").onclick = clickHandler("yellow");