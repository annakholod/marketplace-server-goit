const path = require("path");
const fs = require("fs");
const DBINFO = require("./constants");

const getProducts = (request, response) => {
  const dbCallback =
    (path,
    (err, data) => {
      if (err) {
        response.writeHead(500);
        response.write(err);
        response.end();
        return;
      }
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(data);
      response.end();
    });

  fs.readFile(DBINFO.dbPath, dbCallback);
};

module.exports = getProducts;
