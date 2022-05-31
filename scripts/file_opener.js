const fs = require("fs/promises");
const path = require("path");

class FileOpener {
  constructor() {
    this.options = {
      encoding: "utf-8",
      flag: "r"
    }
  }

  async getFileContent(filePaths, root = "./") {
    const contents = [];
    for (const filePath of filePaths) {
      // console.log(path.join(root, filePath));
      const data = await fs.readFile(path.join(root, filePath), this.options);

      // console.log(data);
      contents.push(data);
    }
    return contents;
  }
}

const fileOpener = new FileOpener();

module.exports = fileOpener;
