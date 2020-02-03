const path = require("path");
const fs = require("fs");
const url = require("url");
const DBINFO = require("./constants");

const getProductsByCategory = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const query = parsedUrl.query;

  const selectedCategory = query
    .slice(query.indexOf("=") + 1)
    .replace(/%22/g, "");

  const dbCallback =
    (path,
    (err, data) => {
      if (err) {
        response.writeHead(500);
        response.write(err);
        response.end();
        return;
      }
      const selectedProducts = JSON.parse(data).filter(product =>
        product.categories.includes(selectedCategory)
      );

      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(
        JSON.stringify({
          status: selectedProducts.length ? "success" : "no products",
          products: selectedProducts
        })
      );
      response.end();
    });

  fs.readFile(DBINFO.dbPath, dbCallback);
};

module.exports = getProductsByCategory;
