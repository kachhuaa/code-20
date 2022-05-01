const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const codeExecuter = require("./scripts/code-executer.js");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("public/lib/monaco-editor/package/dev"));

app.get("/", (req, res) => {
  res.render("editor");
});

app.post("/", (req, res) => {
  console.log(req.body);
  // codeExecuter.execute(__dirname, "temp", req.body.code, "compileAndRun");
  // res.redirect("/");
})

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server started at port 3000.");
  }
});
