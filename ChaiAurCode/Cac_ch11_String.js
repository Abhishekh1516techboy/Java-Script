const names = "Abhishekh";
const repoCount = 15;

console.log(names + repoCount );
console.log(`hello my name is ${names} and my repoCount is ${repoCount}`);

const gameName = new String('Abhishekh1516techboy');
console.log(gameName);
console.log(gameName[0]);
console.log(gameName.length);
console.log(gameName.toLocaleLowerCase());
console.log(gameName.toLocaleUpperCase());
console.log(gameName.includes(1516));
console.log(gameName.charAt(2));
console.log(gameName.indexOf('s'));
console.log(gameName.substring(0, 9));
console.log(gameName.slice(0, 5));

const newUser= "        hitesh   ";
console.log(newUser);
console.log(newUser.trim());

const url = "https://chaicode.com/free%20courses"
console.log(url.replace('%20', '_'));