// localStorage.setItem("name", "Abhishekh kumar");
// localStorage.setItem("userName", "Abhishekh1516techboy");
// localStorage.setItem("id","5");

let key = prompt("Enter key you want to set:");
let value = prompt("Enter value you want to set:");

if (key.length !== 0 && value.length !== 0) {
    localStorage.setItem(`${key}`, `${value}`);
    console.log(localStorage);
}

localStorage.removeItem("password");