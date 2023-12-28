import fs from "fs";

const proudctFilePath = "products.json";

let res = [];
export class GeneralHelpers {
  getProducts() {
    try {
      const data = fs.readFileSync(proudctFilePath);
      res = JSON.parse(data.toString());
    } catch (err) {
      console.error(err);
    }
    return res;
  }
}
