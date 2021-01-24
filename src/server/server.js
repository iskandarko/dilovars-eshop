const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();

const port = 8000;

app.use(express.static(path.join(__dirname, 'build')));

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '31337Mproditicus',
    database: 'sql_store'
});
// multipleStatements: true
// Once multiple statements enabled, you can execute multiple statement queries like any other query:

// connection.query('SELECT 1; SELECT 2', function (error, results, fields) {
//   if (error) throw error;
//   // `results` is an array with one element for every statement in the query:
//   console.log(results[0]); // [{1: 1}]
//   console.log(results[1]); // [{2: 2}]
// });

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.get('/getProducts', (req, res) => {
    console.log('Handling DB request');
    pool.query('SELECT * from customers', (err, rows) => {
        if (err) {
            res.send(err);
        } else {
            res.send(rows);
        }
    });
    // const data = {"data": "Here is some data from the server"};
    // res.send(data);
});

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});