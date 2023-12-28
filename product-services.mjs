import { GeneralHelpers } from "./general-helpers.mjs";

const helpers = new GeneralHelpers();

export class ProductServices {
  getProducts(request, response) {
    const data = helpers.getProducts();
    const res = ProductServices.#responseGenerator(200, data);
    response.write(res);
    response.end();
  }

  createProduct(request, response) {
    request.addListener("data", (data) => {
      const currentData = helpers.getProducts();
      let sortData = currentData.sort((a, b) => {
        return b.id - a.id;
      });
      const newId = sortData[0].id;
      const body = JSON.parse(data.toString());
      body.id = newId + 1;
      sortData.push(body);

      // rewrite JSON file
      helpers.writeJsonToFile("products.json", JSON.stringify(sortData));

      const res = ProductServices.#responseGenerator(200, body);

      response.write(res);
      response.end();
    });
  }

  static #responseGenerator(code, data) {
    return JSON.stringify({
      code: code,
      status: code === 200 ? "OK" : "ERROR",
      data,
    });
  }
}
