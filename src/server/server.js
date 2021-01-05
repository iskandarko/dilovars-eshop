const express = require('express');

const app = express();
const port = 8000;

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});

app.get('/db-request', (req, res) => {
    console.log('Request to DB is handled');
    const data = {"data": "Here is some data from the server"};
    res.send(data);
});