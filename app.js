const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const codeExecuter = require("./scripts/code_executer.js");
const fileOpener = require("./scripts/file_opener.js");
//
// fileOpener.getFileContent(["temp.cpp"]).then(
//   (value) => {
//     console.log(value);
//   },
//   (err) => {
//     console.log(err);
//   }
// );


const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("public/lib/monaco-editor/package/dev"));

app.get("/", (req, res) => {
  const filePaths = [ "temp.cpp", "in", "out" ];
  fileOpener.getFileContent(filePaths).then(
    (fileContent) => {
      for (let i = 0; i < fileContent.length; i++) {
        fileContent[i] = fileContent[i].replace(/\\/, '\\\\');
      }
      console.log(fileContent);
      res.render("editor", { fileContent: fileContent });
    }
  );
});

app.post("/", (req, res) => {
  console.log(req.body);
  codeExecuter.execute(__dirname, "temp", "compileAndRun", req.body.codeMain, req.body.inputMain, req.body.outputMain).then(() => res.redirect("/"));
  // res.redirect("/");
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server started at port 3000.");
  }
});
