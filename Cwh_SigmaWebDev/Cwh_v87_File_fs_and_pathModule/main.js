import fs from 'fs'
console.log("Program Starts.")

// Second examples....
fs.writeFileSync("harry.txt", "Harry is a developer! he is best teacher");

// Second examples....
 fs.writeFile("harry2.txt", "Harry is a good programmer and best teacher for cs students!", () => {
    console.log("Writing Done in file.");
    fs.readFile("harry2.txt", (error, data) => {
        console.log("Reading start from file.");
        console.log("Error:",error,"\nData:", data.toString());
        console.log("Reading Done from file...");
    });
});

// third examples....
// fs.appendFile("harry3.txt", "harry bro thanks for teaching in free of cost.", () => {
//   console.log("Writing done in harry3.txt file");
// });

console.log("Program end...") 