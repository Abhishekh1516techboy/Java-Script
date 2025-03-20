// send Post Request with fetch API...
// -----------------------------------
// let options = {
//     method: "POST",
//     headers: {
//         "Content-type": "application/json",
//     },
//     body: JSON.stringify({
//         title: "JavaScript Tutorial",
//         body: "Harry",
//         userId: 5,
//     }),
// }

// fetch("https://jsonplaceholder.typicode.com/posts", options)
//     .then((response) => response.json())
//     .then((json) => console.log(json));


// --------------------------------------------------
const createTodo = async (todo) => {
    let options = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(todo),
    }

    let p = await fetch("https://jsonplaceholder.typicode.com/posts", options);
    let response = await p.json();
    return response;
};

const mainFunction = async () => {
    let todoObj = {
        title: "JavaScript Tutorial",
        body: "Harry",
        userId: 5,
    }
    
    let todo = await createTodo(todoObj);
    console.log(todo);
};

mainFunction();