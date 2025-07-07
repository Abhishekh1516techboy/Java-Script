import express from "express";
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("This is Query Parameteres!");
});

app.get("/product", (req, res) => {
  const { search, page } = req.query;
  res.send(`<h1>This Product name is ${search} page-${page}</h1>`);
});

app.listen(PORT, () =>
  console.log(`Example app listening on http://localhost:${PORT}`)
);
