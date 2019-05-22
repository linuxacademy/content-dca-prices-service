var express = require("express");
var app = express();
var Request = require("request");

const PORT = process.env.PORT || 3000;
const FRUIT_HOST = process.env.FRUIT_HOST || "localhost";
const FRUIT_PORT = process.env.FRUIT_PORT || 8080;
const VEGETABLE_HOST = process.env.VEGETABLE_HOST || "localhost";
const VEGETABLE_PORT = process.env.VEGETABLE_PORT || 8081;

app.get("/", (req, res, next) => {
  Request.get(`http://${VEGETABLE_HOST}:${VEGETABLE_PORT}`, (error, response, body) => {
    if (error) {
      return console.dir(error);
    }
    var vegetables = JSON.parse(body).vegetables;
    Request.get(`http://${FRUIT_HOST}:${FRUIT_PORT}`, (error, response, body) => {
      if (error) {
        return console.dir(error);
      }
      var fruit = JSON.parse(body).fruits;
      var allProducts = fruit.concat(vegetables).sort();
      res.json({description: "A list of all produce.", products: allProducts});
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`${PORT} http://${VEGETABLE_HOST}:${VEGETABLE_PORT} http://${FRUIT_HOST}:${FRUIT_PORT}`);
});
