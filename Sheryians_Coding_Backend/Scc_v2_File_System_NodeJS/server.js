import fs from "fs";

// ---------write file and store data in files----------
fs.writeFile("myFile.txt", "Hello developer this is Backend Series", (err) => {
  if (err) console.error(err);
  else console.log("Done Writing in file");
});


// ----------write file and append data in files----------
fs.appendFile("myFile.txt", "Hello developer this is Backend Series by @SheryiansCodingSchool\n", (err) => {
  if (err) console.error(err);
  else console.log("Done append in file");
});


// ----------Read file----------
fs.readFile("myFile.txt", (error, data) => {
    console.log("Reading start from file.");
    console.log("Error:",error,"\nData:", data.toString());
    console.log("Reading Done from file...");
});


// ----------Rename file name-----------
fs.rename("myFile.txt", "myNewFile.txt", (err) => {
    if (err) throw err;
    else console.log('Rename complete!');
});


// ----------Create New Folder-----------
fs.mkdir("./copy", {recursive:true}, (err) => {
    if (err) throw err;
    else console.log('Create new dir complete!');
});


// ----------Copy file to New Folder and create new newCopyFile.txt file and paste old file data-----------
fs.copyFile("myNewFile.txt", "./copy/newCopyFile.txt", (err) => {
    if (err) throw err;
    else console.log('Copy complete!');
});
 

// ----------Unlink file means delete files-----------
fs.unlink("myNewFile.txt", (err) => {
    if (err) throw err;
    else console.log('Unlink complete!');
});


// ----------Remove directory-----------
fs.rm("./copy", {recursive:true},(err) => {
    if (err) throw err;
    else console.log('Remove Dir complete!');
});


