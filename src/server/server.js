const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();

//For filling in the DB
// import { storeProducts } from './data';


const port = 8000;

app.use(express.static(path.join(__dirname, 'build')));

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB
});

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.get('/getProducts', (req, res) => {
    console.log('Handling DB request');
    pool.query('SELECT * from products', (err, rows) => {
        if (err) {
            res.send(err);
        } else {
            res.send(rows);
        }
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