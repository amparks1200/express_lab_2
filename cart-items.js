const express = require("express");
const routes = express.Router();
const pool = require("./connections");

routes.get("/cart-items", function(req, res) {
    let maxPrice = parseFloat(req.query.maxPrice);
    let prefix = req.query.prefix;
    let pageSize = req.query.pageSize;

// responds with JSON array of cart items with max price
    if (maxPrice) {
        pool.query('SELECT * FROM shopping_cart WHERE price<=$1', [maxPrice]).then(results => {
            res.json(results.rows);
        });
// responds with JSON array of cart items with prefix
    } if (prefix) {
        pool.query('SELECT * FROM shopping_cart WHERE product LIKE $1', [prefix + '%']).then(results => {
            res.json(results.rows);
        });
// responds with JSON array of indicated page size
    } if (pageSize) {
// responds with JSON array of all cart items & status code 200
    } else {
    pool.query("SELECT * FROM shopping_cart order by id").then(result =>
        {
            res.json(result.rows);
            res.status(200);
        });
}});

routes.get("/cart-items/:id", function(req, res) {
    
});
routes.post("/cart-items", function(req, res) {

});

routes.put("cart-items", function(req, res) {

});

routes.delete("cart-items", function(req, res) {

});
module.exports = routes;