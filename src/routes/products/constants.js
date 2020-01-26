const path = require("path");

const DBINFO = {
  dbName: "all-products.json",
  dbPath: path.join(__dirname, "../../db/", "all-products.json")
};

module.exports = DBINFO;
