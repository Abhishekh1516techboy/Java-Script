sessionStorage.setItem("name", "Abhishekh kumar");
sessionStorage.setItem("id", "5");

// sessionStorage.removeItem("password");

window.onstorage = (e) => {
  alert(`Storage update.\n\"${e.key}\" is changed new value is \"${e.newValue}\" old value was \"${e.oldValue}\"`);  
  console.log(e);
};
