const path = require("path");
const fs = require("fs");
const url = require("url");
const DBINFO = require("./constants");

const getProductsByQuery = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const query = parsedUrl.query;

  const selectedIds = query
    .slice(query.indexOf("=") + 1)
    .replace(/%27/g, "")
    .split(",%20")
    .map(id => Number(id));

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
        selectedIds.find(selectedId => product.id === selectedId)
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

module.exports = getProductsByQuery;
