import os from 'os';
import path from 'path'
import fs from 'fs'

// --------NodeJs callback function---------
// function callBack (name= "abhishekh" ) {
//     console.log("call function call my name is : ", name);
// }

// function add (a, b) {
//     console.log("result", a + b);
//     callBack("ankit raj");
// }

// add(4, 5);



// ---------NodeJs backend Server---------
import express from 'express';

const app = express();
const port = 3000; // running PORT 3000

app.get('/', (req, res) => {
    res.send('Hello World! Welcome to my first server.');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


// ------------- OS(oprating System) Modules------------

// console.log("CPU Architucture: ",os.arch());

// console.log("CPU Model:", os.cpus()[0].model);
// console.log("CPU Speed:", os.cpus()[0].speed);
// console.log("Number of CPU cores:", os.cpus().length);

// // Free memory in device
// // In kilobytes (KB)
// console.log("Free memory (KB): ", os.freemem() / 1024);

// // In megabytes (MB)
// console.log("Free memory (MB): ", os.freemem() / (1024 * 1024));

// // In gigabytes (GB)
// console.log("Free memory (GB): ", os.freemem() / (1024 * 1024 * 1024));

// // Total memory In gigabytes (GB)
// console.log("Total memory: ", os.totalmem() / (1024 * 1024 * 1024)); 

// Get home Directory path
// console.log("Home Directory: ",os.homedir())

// // PC host Name show
// console.log("Pc Name: ",os.hostname())

// machine Arch with type
// console.log("machine Arch with type : ",os.machine())


// Show network Interface Full info of Wi-Fi IP and More
// console.log("Network interface: ",os.networkInterfaces())

// Show platform like win32 or Ios, Android
// console.log("Platform: ", os.platform())

// operating system release version
// console.log(" operating system Version: ",os.release())


// show Device Temp directory path
// console.log("Temporary Directory:", os.tmpdir());

// show os type like window , linux, ios
// console.log(os.type())

// show operationg system name like windows 11 home singe language
// console.log(os.version())


// Show system Up-Time
// console.log("System up-Time: " ,os.uptime())

// show userInfo
// console.log(os.userInfo())


// ----------Path Module----------

// show dir name
// console.log(path.dirname(""))


// show extension name of files like .txt, .js, .pdf etc.
// console.log(path.extname("./server.js"))


// -------------file system module-----------

const userInfo = os.userInfo();

// Append data in file
fs.appendFile("greeting.txt", `hello mr.${userInfo.username}\n`, () => {
    console.log("greeting message created")
})

