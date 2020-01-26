const path = require("path");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");

const getProductsByQuery = require("./getProductsByQuery");
const getProductsByCategory = require("./getProductsByCategory");
const getProducts = require("./getProducts");
const getSingleProduct = require("./getSingleProduct");
const { getId } = require("./helpers");

const productsRoute = (request, response) => {
  const parsedUrl = url.parse(request.url);

  if (request.method == "GET") {
    if (parsedUrl.query) {
      const queryType = parsedUrl.query.slice(0, parsedUrl.query.indexOf("="));
      switch (queryType) {
        case "ids":
          getProductsByQuery(request, response);
          break;
        case "category":
          getProductsByCategory(request, response);
          break;
        default:
          getProducts(request, response);
          break;
      }
    } else {
      getId(parsedUrl.pathname)
        ? getSingleProduct(request, response)
        : getProducts(request, response);
    }
  } else {
    response.writeHead(200);
    response.write("Unknown method");
    response.end();
  }
};

module.exports = productsRoute;
