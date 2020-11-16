const express = require('express');
const cors = require('cors');
const createReceiptData = require('./src/lib/createReceiptData');

const app = express();

const port = process.env.PORT || 3000;

const corsOptions = {
    origin: true,
    methods: 'POST'
    // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

// Simple Usage (Enable All CORS Requests)
// app.use(cors());

// Receipt making API
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.post('/makereceipt', cors(corsOptions), (req, res) => res.status(201).json({ receipt: createReceiptData(req.body.menu, req.body.order) }));

const server = app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    'press Ctrl-C to terminate.'
));

module.exports = server;
