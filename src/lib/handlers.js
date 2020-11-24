const createReceiptData = require('./createReceiptData');
const { receipt, htmlReceipt } = require('../lib/receipt');

exports.redirectHome = (req, res) => res.redirect('https://ryansreceipts.com');

exports.makeReceipt = (req, res) => res.json({ receipt: createReceiptData(req.body.menu, req.body.order) })

exports.plainTextReceipt = (req, res) => res.send(receipt(req.body.menu, req.body.order));

exports.htmlReceipt = (req, res) => res.send(htmlReceipt(req.body.menu, req.body.order));