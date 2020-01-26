const path = require("path");
const fs = require("fs");
const url = require("url");
const DBINFO = require("./constants");
const { getId } = require("./helpers");

const getSingleProduct = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const id = Number(getId(parsedUrl.path));

  const dbCallback =
    (path,
    (err, data) => {
      if (err) {
        response.writeHead(500);
        response.write(err);
        response.end();
        return;
      }
      const selectedProduct = JSON.parse(data).find(
        product => product.id === id
      );
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(
        JSON.stringify({
          status: selectedProduct ? "success" : "no products",
          products: selectedProduct ? [selectedProduct] : []
        })
      );
      response.end();
    });

  fs.readFile(DBINFO.dbPath, dbCallback);
};

module.exports = getSingleProduct;
