import express from "express";
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("This is Route Parameteres!");
});

app.get("/profile/:userName/", (req, res) => {
  const { userName } = req.params;
  res.send(`<h1>My name is ${userName.toUpperCase()}</h1>`);
});

app.get("/profile/:userName/article/:slug", (req, res) => {
  const { userName, slug } = req.params;
  const formatedSlug = slug.replace(/-/g, " "); // remove /-/-/
  res.send(
    `<h1>This "${formatedSlug}" article by ${userName.toUpperCase()}</h1>`
  );
});

app.listen(PORT, () =>
  console.log(`Example app listening on http://localhost:${PORT}`)
);
