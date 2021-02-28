const express = require("express");
const routes = require("./cart-items");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", routes);

let port = 3000;

app.listen(port, _ => console.log(`Server is running on port ${port}`));

app.get('/test', (req, res) => {
    res.json('Healthcheck succeeded');
});