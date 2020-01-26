const qs = require("querystring");
const fs = require("fs");
const path = require("path");

const signUpRoute = (request, response) => {
  if (request.method === "POST") {
    let body = "";

    request.on("data", function(data) {
      body = JSON.parse(data);
    });

    request.on("end", function() {
      const userName = body.username;
      const usersPath = path.join(
        __dirname,
        "../../db/users/",
        `${userName}.json`
      );

      fs.writeFile(usersPath, JSON.stringify(body), () => {
        const res = { status: "success", user: body };

        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify(res));
        response.end();
      });
    });
  } else {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Unknown method");
    response.end();
  }
};

module.exports = signUpRoute;
