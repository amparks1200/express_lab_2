const express = require("express");
const cartItems = express.Router();
const pool = require("./connections");

cartItems.get("/cart-items", function(req, res) {
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
        pool.query('SELECT * FROM shopping_cart WHERE count<=$1', [pageSize]).then(results => {
            res.json(results.rows);
        });
// responds with JSON array of all cart items & status code 200
    } else {
    pool.query("SELECT * FROM shopping_cart order by id").then(result =>
        {
            res.json(result.rows);
            res.status(200);
        });
}});

cartItems.get("/cart-items/:id", function(req, res) {
    const id = parseInt(req.params.id);
    const items = results.rows;
// responds with JSON object of the item with the given ID
if (items) {
        pool.query('SELECT * FROM shopping_cart WHERE id<=$1', [id].then(results => {
        res.json(items);
// responds with status code 200
        res.status(200);
    })) 
// responds with status code 404 when not found
} else {
    res.status(404).send('item not found');
}});

cartItems.post("/cart-items", function(req, res) {
    let add = req.body;
    // Add a cart item to the database using the JSON body of the request. Database generates a unique ID for that item.
    pool.query('INSERT INTO shopping_cart (product, price, quantity) VALUES ($1, $2, $3)'), [add.product, add.price, add.quantity].then( () => {
        res.json(add);
    //  responds with the added cart item object as JSON and status code 201.
        res.status(201);
    });
});

cartItems.put("cart-items/:id", function(req, res) {
    let id = req.params.id;
    const update = req.body;
    // updates the cart item in the database that has the given id
    pool.query('UPDATE shopping_cart SET product id<=$1, price<=$2, quantity<=$3 WHERE id<=$4', [req.body.product, req.body.price, req.body.quantity, id]).then( () => {
    // responds with the updated cart item as JSON and status code 200
        res.json(update);
        res.status(200);
});

cartItems.delete("cart-items/:id", function(req, res) {
    let id = req.params.id;
// removes the itme from the database that has the given ID
        pool.query('DELETE * FROM shopping_cart WHERE id<=$1', [id]).then( () => {
        res.json();
// responds with no content and status code 204
        res.status(204);
});

module.exports = cartItems;