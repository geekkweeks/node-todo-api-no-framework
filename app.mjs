import http from "http";
import { ProductServices } from "./product-services.mjs";

const service = new ProductServices();

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (req.method === "GET") {
    service.getProducts(req, res);
  }
});

server.listen(3000);
