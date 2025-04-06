import express from "express";
const app = express();
const port = 3000;

// ------------Middleware-----------
app.use((req, res, next) => {
  console.log("This is Middleware!");
  next();
});

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

// ---------Routes---------
app.get("/", (req, res) => {
  res.send("Welcome NodeJs Backend series.");
});

app.get("/profile", (req, res, next) => {
  //   res.send("Hello Developer this is Your Profile.");
  return next(new Error("Not impliment"));
});

// ----------Error handling----------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
