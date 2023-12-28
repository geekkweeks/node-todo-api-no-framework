import fs from "fs";

const proudctFilePath = "products.json";

let res = [];
export class GeneralHelpers {
  getProducts() {
    try {
      const data = fs.readFileSync(proudctFilePath);
      const jsonData = JSON.parse(data.toString());
      res = jsonData;
    } catch (err) {
      console.error(err);
    }
    return res;
  }

  writeJsonToFile(filePath, jsonData) {
    // write new content
    fs.writeFileSync(filePath, jsonData);
  }
}
