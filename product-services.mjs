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
      let sortData = helpers.sortData(currentData, "desc");
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

  deleteProduct(request, response) {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const productId = url.searchParams.get("productId");
    if (productId) {
      const products = helpers.getProducts();
      const customProducts = products.filter((item) => {
        return item.id !== parseInt(productId);
      });
      // rewrite JSON file
      helpers.writeJsonToFile("products.json", JSON.stringify(customProducts));
    }
    const res = ProductServices.#responseGenerator(200, null);
    response.write(res);
    response.end();

    // console.log(request);
  }

  static #responseGenerator(code, data) {
    return JSON.stringify({
      code: code,
      status: code === 200 ? "OK" : "ERROR",
      data,
    });
  }
}
