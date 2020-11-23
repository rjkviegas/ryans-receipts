const express = require('express');
const cors = require('cors');
const createReceiptData = require('./src/lib/createReceiptData');

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/', (req, res) => {
    res.redirect('https://ryansreceipts.com');
});

app.post('/makereceipt', (req, res) => {
    res.status(201)
    .json({ receipt: createReceiptData(req.body.menu, req.body.order) }) 
});

const server = app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    'press Ctrl-C to terminate.'
));

module.exports = server;
