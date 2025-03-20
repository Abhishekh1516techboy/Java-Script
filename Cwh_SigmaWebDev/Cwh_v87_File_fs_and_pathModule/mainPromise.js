import fs from 'fs/promises'
console.log('code start')
// console.log(fs)
// fs.rename("script.js","main.js"); // rename files from old to new...

await fs.writeFile("abhi.txt", "Abhishekh is a javaScript developer and programmer.");

let read = await fs.readFile("abhi.txt");
console.log(read.toString())
console.log('code end')