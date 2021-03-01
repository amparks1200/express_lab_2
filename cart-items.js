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
        pool.query('SELECT * FROM shopping_cart WHERE count<=$1', [pageSize].then(results => {
            res.json(results.rows);
        }))
// responds with JSON array of all cart items & status code 200
    } else {
    pool.query("SELECT * FROM shopping_cart order by id").then(result =>
        {
            res.json(result.rows);
            res.status(200);
        });
}});

routes.get("/cart-items/:id", function(req, res) {
    let item = cartItems.find(itemID => itemID.id === parseInt(req.params.id));
// responds with JSON object of the item with the given ID
    if (item) {
        pool.query('SELECT * FROM shopping_cart WHERE id<=$1', [item].then(results => {
        res.json(results.rows);
// responds with status code 200
        res.status(200);
    })) 
// responds with status code 404 when not found
} else {
    res.status(404);
}});

routes.post("/cart-items", function(req, res) {

});

routes.put("cart-items/:id", function(req, res) {

});

routes.delete("cart-items/:id", function(req, res) {
    let item = cartItems.find(itemID => itemID.id === parseInt(req.params.id));
//Removes the itme from the database that has the given ID
    if (item) {
        pool.query('DELETE * FROM shopping_cart WHERE id<-$1', [item].then(results => {
            res.json(results.rows);
        }))
// responds with no content and status code 204
    } else {
        res.status(204);
    }
});

module.exports = routes;