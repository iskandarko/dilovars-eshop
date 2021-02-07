const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

// For filling in the DB
// import { storeProducts } from './data';

const port = 8000;

app.use(express.static(path.join(__dirname, 'build'))); //might not be required
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB
});

app.get('/products/', (req, res) => {
    console.log('Getting products from DB...');
    const sql = 'SELECT * from products';
    pool.query(sql, (err, rows) => {
        if (err) {
            res.send(err);
        } else {
            res.send(rows);
        }
    });
});

app.post('/products/', (req, res) => {
    console.log('Adding product to DB: ');
    console.log(req.body);
    const newProduct = req.body;
    const sql = "INSERT INTO products SET ?";
    pool.query(sql, newProduct, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.put('/products/:product_id', (req, res) => {
    console.log('Updating product: ');
    console.log(req.body);
    const product = req.body;
    const sql = `UPDATE products SET ? WHERE id = ${pool.escape(req.params.product_id)}`;
    pool.query(sql, product, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.delete('/products/:product_id', (req, res) => {
    console.log('Deleting product ' + req.params.product_id);
    const sql = 'DELETE FROM products WHERE id = ' + pool.escape(req.params.product_id);
    pool.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

// Filling in the database
// app.get('/setAllProducts', (req, res) => {
//     const sql = 'INSERT INTO products (title, img, price, company, info, inCart, count, total) VALUES ?';
//     pool.query(sql, [storeProducts], (err, rows) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(rows);
//             console.log('Products added to DB');
//         }
//     })
// });

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});