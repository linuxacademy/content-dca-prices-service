var express = require("express");
var app = express();
var Request = require("request");

const PORT = process.env.PORT || 3000;
const BASE_PRICE_HOST = process.env.BASE_PRICE_HOST || "localhost";
const BASE_PRICE_PORT = process.env.BASE_PRICE_PORT || 8080;
const SALES_HOST = process.env.SALES_HOST || "localhost";
const SALES_PORT = process.env.SALES_PORT || 8081;

app.get("/", (req, res, next) => {
  Request.get(`http://${SALES_HOST}:${SALES_PORT}`, (error, response, body) => {
    if (error) {
      return console.dir(error);
    }
    var sales = JSON.parse(body).products;
    Request.get(`http://${BASE_PRICE_HOST}:${BASE_PRICE_PORT}`, (error, response, body) => {
      if (error) {
        return console.dir(error);
      }
      var basePrices = JSON.parse(body).products;
      var totalPrices = JSON.parse(JSON.stringify(basePrices));
      for (const saleItem of sales) {
        console.log(saleItem.name);
        var item = totalPrices.find(function(element) {
          return element.name === saleItem.name
        })
        item.price = (item.price - (item.price * (saleItem.discount / 100))).toFixed(2);
      }
      res.json({description: "A list of total prices, including discounts.", products: totalPrices});
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`${PORT} http://${SALES_HOST}:${SALES_PORT} http://${BASE_PRICE_HOST}:${BASE_PRICE_PORT}`);
});
