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

  sortData(data, type) {
    if (type === "desc") {
      return data.sort((a, b) => {
        return b.id - a.id;
      });
    }

    if (type === "asc") {
      return data.sort((a, b) => {
        return a.id - b.id;
      });
    }

    return data;
  }
}
