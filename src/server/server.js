const express = require('express');
const path = require('path');
const app = express();

const port = 8000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/db-request', (req, res) => {
    console.log('Request to DB is handled');
    const data = {"data": "Here is some data from the server"};
    res.send(data);
});

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});