const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const client = require("./db");

//middleware
app.use(express.json()); //req.body
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
