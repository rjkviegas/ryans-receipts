const express = require('express');
const cors = require('cors');
const handlers = require('./src/lib/handlers');

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', handlers.redirectHome);

app.post('/makereceipt', handlers.makeReceipt);

app.post('/plaintextreceipt', handlers.plainTextReceipt);

app.post('/htmlreceipt', handlers.htmlReceipt);

const server = app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    'press Ctrl-C to terminate.'
));

module.exports = server;
