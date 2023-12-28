import { GeneralHelpers } from "./general-helpers.mjs";

const helpers = new GeneralHelpers();

export class ProductServices {
  getProducts(request, response) {
    const data = helpers.getProducts();

    const res = JSON.stringify({
      code: 200,
      status: "OK",
      data,
    });

    response.write(res);
    response.end();
  }
}
