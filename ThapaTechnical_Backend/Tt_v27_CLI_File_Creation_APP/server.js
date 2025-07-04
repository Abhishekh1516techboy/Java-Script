import readline from "readline";
import fs from "fs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fileCreation = () => {
  rl.question("Enter the file name: ", (fileName) => {
    rl.question("Enter the content to add in file: ", (content) => {
      fs.writeFile(`${fileName}.txt`, content, (err) => {
        if (err) {
          console.error(`Error while writing the file:, ${err.message}`);
        } else {
          console.info(`File Created "${fileName}.txt" Successfully!`);
        }
        rl.close();
      });
    });
  });
};

fileCreation();
