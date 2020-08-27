const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const cors = require("cors");

//middleware
app.use(express.json()); //req.body
app.use(cors());

app.use("/auth", require("./routes/jwtAuth"));

app.get("/", (req, res) => {
  res.send("hi");
});

server.listen(process.env.PORT || 8000, () =>
  console.log(`Server has started on port 8000.`)
);
