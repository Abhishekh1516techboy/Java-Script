import express from "express";
const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // parse JSON Data
app.use(express.urlencoded({ extended: true })); // URL-encoded

// Route JSON data
app.post("/api/data", (req, res) => {
  // req.body will contain the parsed JSON data
  console.log(req.body);
  res.json({ message: "Data received", data: req.body });
});

// Route URL-encoded form data
app.post("/submit-form", (req, res) => {
  // req.body will contain the parsed form data
  console.log(req.body);
  res.send(`Received: ${JSON.stringify(req.body)}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
