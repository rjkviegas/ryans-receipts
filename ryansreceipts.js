const express = require('express');
const cors = require('cors');
const createReceiptData = require('./src/lib/createReceiptData');

const app = express();

const port = process.env.PORT || 3000;

// const corsOptions = {
//     "origin": true,
//     "methods": ['POST'],
//     "preflightContinue": true,
//     "optionsSuccessStatus": 204
// }

// app.use(cors());

// Receipt making API
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

const corsOptions = {
    "origin": true,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": true,
    "optionsSuccessStatus": 204
}

app.options('*', cors(corsOptions));
app.post('/makereceipt', cors(corsOptions), (req, res) => res.status(201).json({ receipt: createReceiptData(req.body.menu, req.body.order) }));

const server = app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    'press Ctrl-C to terminate.'
));

module.exports = server;
