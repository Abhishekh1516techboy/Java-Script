import express from "express";
import path from "path"; // Node.js module for handling file paths
import { fileURLToPath } from "url"; // Utility to convert ES module URLs to file paths
import fs from "fs";
const app = express();
const port = 3000;

// Configure the view engine to use EJS for rendering templates
app.set("view engine", "ejs"); // EJS templates will be used for dynamic HTML

// Derive __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url); // Get the current file's path
const __dirname = path.dirname(__filename); // Get the directory of the current file

// --------Middleware setup--------
app.use(express.json()); // Parse incoming JSON payloads, making them available in req.body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data (e.g., from HTML forms)
app.use(express.static(path.join(__dirname, "public"))); // Serve static files (e.g., CSS, JS, images) from the 'public' directory

// ---------Routing---------
app.get("/", (req, res) => {
  // read directory
  fs.readdir(`./files`, (err, files) => {
    res.render("index", { files }); // render index.ejs
  });
});

// Create files
app.post("/create", (req, res) => {
  const title = req.body.title.split(" ").join("").trim();
  const details = req.body.details.trim();

  // Check if title or details are not empty
  if (title && details) {
    fs.writeFile(`./files/${title}.txt`, details, (err) => {
      res.redirect("/");
    });
  } else {
    res.redirect("/");
  }
});

// Read files data
app.get("/read/files/:slug", (req, res) => {
  // read files
  const fileName = req.params.slug;
  fs.readFile(`./files/${fileName}`, "utf-8", (error, data) => {
    res.render("show", { fileName, data });
  });
});

// -----Edit Files------- 
app.get("/edit/files/:slug", (req, res) => {
  const fileName = req.params.slug;
  fs.readFile(`./files/${fileName}`, "utf-8", (err, data) => {
    if (err) {
      return res.redirect("/");
    }
    res.render("edit", { fileName, fileContent: data });
  });
});

// Handle POST form submission for editing
app.post("/edit/files/:slug", (req, res) => {
  const originalFileName = req.params.slug;
  const newTitle = req.body.title.split(" ").join("").trim();
  const newContent = req.body.content.trim();

  // check 
  if (!newTitle || !newContent) {
    return res.redirect(`/edit/files/${originalFileName}`);
  }

  const newFileName = `${newTitle}.txt`;
  const newFilePath = `./files/${newFileName}`;
  const originalFilePath = `./files/${originalFileName}`;

  // If title didn't change, just overwrite content
  if (newFileName === originalFileName) {
    fs.writeFile(originalFilePath, newContent, (err) => {
      if (err) {
        return res.redirect("/");
      }
      res.redirect("/");
    });
  } else {
    // Title changed: rename the file then write new content
    fs.rename(originalFilePath, newFilePath, (renameErr) => {
      if (renameErr) {
        return res.redirect("/");
      }
      fs.writeFile(newFilePath, newContent, (writeErr) => {
        if (writeErr) {
          console.error(writeErr);
        }
        res.redirect("/");
      });
    });
  }
});

// Delete files
app.delete("/delete/files/:slug", (req, res) => {
  // Unlink files
  const fileName = req.params.slug;
  fs.unlink(`./files/${fileName}`, (err) => {
    if (err) throw err;
    else res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
