const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("editor");
});

app.post("/", (req, res) => {
  console.log(req.body);
})

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server started at port 3000.");
  }
});
