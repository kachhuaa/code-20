const path = require("path");
const { spawn } = require("child_process");
const fs = require("fs/promises");

class Executer {
  constructor() {
    this.args = [
      "-Wall", "-Wextra", "-pedantic",
      "-std=c++17", "-O2", "-Wshadow",
      "-Wformat=2", "-Wfloat-equal",
      "-Wsign-conversion",
      "-Wconversion", "-Wlogical-op",
      "-Wshift-overflow=2", "-Wduplicated-cond",
      "-Wcast-qual", "-Wcast-align",
      "-D_GLIBCXX_DEBUG",
      "-D_GLIBCXX_DEBUG_PEDANTIC",
      "-D_FORTIFY_SOURCE=2", "-fsanitize=address",
      "-fsanitize=undefined",
      "-fno-sanitize-recover",
      "-fstack-protector"
    ];
  }

  compile(filePath, fileName, programCode) {
    const obj = this;
    return new Promise((resolve, reject) => {
      const fullPath = path.join(filePath, fileName);

      // SAVE CODE TO FILE
      const writePromise = fs.writeFile(`${fullPath}.cpp`, programCode, {encoding: "utf8"});
      writePromise.then(function(_) {
        // ADD SOURCE FILE AND NAME OF OBJECT FILE TO ARGS
        const args = obj.args.slice();
        args.push(`${fullPath}.cpp`);
        args.push(`-o`);
        args.push(`${fullPath}`);

        // SPAWN NEW PROCESS TO COMPILE THE CODE
        const compileCode = spawn("g++", args);
        compileCode.stdout.on("data", (data) => {
          console.log(`stdout: ${data.toString()}`);
        });
        compileCode.stderr.on("data", (data) => {
          console.log(`stderr: ${data.toString()}`);
        });
        compileCode.on("error", (error) => {
          console.log(`error: ${error.message}`);
        });
        compileCode.on("close", code => {
          if (code === 0) {
            console.log("Build successful.");
            resolve({obj: obj, filePath: filePath, fileName: fileName});
          } else {
            console.log("Compilation failed!");
            reject({obj: obj, filePath: filePath, fileName: fileName});
          }
        });

        // TERMINATE PROCESS IF IT TAKES TOO LONG
        const maxCompileTime = 5;
        return setTimeout(() => {
          if (compileCode.exitCode === null) {
            compileCode.kill();
            console.log(`Build took more than ${maxCompileTime} seconds...`);
            console.log(`Build Terminated!`);
            reject(filePath, fileName);
          }
        }, maxCompileTime * 1000);
      });
    });
  }

  async run(filePath, fileName) {
    const fullPath = path.join(filePath, fileName);

    try {
      await fs.opendir(filePath);     // CHECK IF DIRECTORY EXISTS
      await fs.readFile(fullPath);    // CHECK IF FILE EXISTS

      // RUN EXECUTABLE
      const runCode = spawn(`./${fileName}`, {cwd: filePath});
      runCode.stdout.on("data", (data) => {
        console.log(data.toString());
      });
      runCode.stderr.on("data", (data) => {
        console.log(`stderr: ${data.toString()}`);
      });
      runCode.on("error", (error) => {
        console.log(`An error occurred!`);
        console.log(error.message);
      });
      runCode.on("close", (code) => {
        console.log(`Process exited with code ${code}.`);
      });

      // TERMINATE PROCESS IF IT TAKES TOO LONG
      setTimeout(() => {
        if (runCode.exitCode == null) {
          runCode.kill();
          console.log(`Program Execution took more than ${maxRunTime} seconds...`);
          console.log(`Program Terminated!`);
        }
      }, 5000);
    } catch (err) {
      console.log(err);
    }
  }

  compileAndRun(filePath, fileName, programCode) {
    // COMPILE, THEN RUN
    this.compile(filePath, fileName, programCode).then(
      (value) => {
        value.obj.run(value.filePath, value.fileName);
      },
      () => {}
    );
  }

  execute(filePath, fileName, programCode, command) {
    // this.save(code);
    if (command === "compile") {
      this.compile(filePath, fileName, programCode);
    } else if (command === "compileAndRun") {
      this.compileAndRun(filePath, fileName, programCode);
    }
  }
};

const executer = new Executer();

module.exports = executer;
