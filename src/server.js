const http = require("http");
const url = require("url");

const morgan = require("morgan");
const router = require("./routes/router");
const getRouteHandler = require("./helpers/get-route-handler");

const logger = morgan("combined");

const startServer = port => {
  const server = http.createServer((request, response) => {
    // Get route from the request
    const parsedUrl = url.parse(request.url);
    const parsedUrlPathname =
      parsedUrl.pathname.slice(-1) === "/"
        ? parsedUrl.pathname.slice(0, -1)
        : parsedUrl.pathname;
    // Get router function

    const func = getRouteHandler(router, parsedUrlPathname) || router.default;

    logger(request, response, () => func(request, response));
  });

  server.listen(port, err => {
    if (err) {
      return console.log("something bad happened", err);
    }
    console.log(`server is listening on ${port}`);
  });
};

module.exports = startServer;
