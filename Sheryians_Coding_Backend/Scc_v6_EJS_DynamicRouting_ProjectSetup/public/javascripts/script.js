const pageTitle = document.getElementById("pageTitle");

const names = prompt("Enter Your name");

pageTitle.innerText = `Hello mr. ${names.toUpperCase()}`;
